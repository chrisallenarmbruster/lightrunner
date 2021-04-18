# boilerplate-fern

_Full Stack without a Database_

Looking to integrate a backend with `express` that substitutes the
filesystem for a database with a frontend having `react`/`redux`?  
That's `boilerplate-fern`!

This is for implementations where the developer may not want to have
the overhead of a database in the solution or connecting to a database
is not practical or desirable. It was created for smaller IoT devices
running Node, but not having a local database or a reliable connection
to a remote database. It uses the filesystem for data persistence between
boots. More details are included in the 'Data' section below.

Note that this is not a scaleable solution, but just the opposite. It is
a miniturized solution for when data storage and retrival needs are lower
and simultaneous logins are low as well.

## Setup

To use this as boilerplate, you'll need to take the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  GitHub and clone it to your local machine) named for the app that you
  will be using this boilerplate for. Then fetch the boilerplate
  and merge it into your repository. Something like this:

  ```
  git remote add boilerplate-pern https://github.com/chrisallenarmbruster/boilerplate-fern.git
  git fetch boilerplate-fern
  git merge boilerplate-fern/main
  ```

- Why did we do that? Because every once in a while, `boilerplate-fern` may
  be updated with additional features or bug fixes, and you can easily
  get those changes from now on by entering:

  ```
  git fetch boilerplate-fern
  git merge boilerplate-fern/main
  ```

## Customize

- Update project name and description in `package.json`
- `npm install`

## Data

As mentioned above, there is no integration to a database included by design.
With that said, there is a 'FileDbTable' class included for:

- Creating 'table' objects for storing data as objects in an array
  similar to rows in a table
- Providing basic CRUD methods for interacting 'tables'
- Persisting the data using the filesystem
- Retrieving the data from the filesystem at boot
- It is used in this boilerplate for user accounts and authentication.

You can locate the related resources in the /server/fileDb directory.

Seed the application - `npm run seed` - there is a `seed.js` file in the
script directory to get you started that creates three user accounts.

## Environment Variables

- This boilerplate uses the "dotenv" node module. If an `.env` file
  in the project root does not exist, create one for setting environment
  variables to use during development. Note that the production instance
  will often set these a different way - sometimes you system admin may
  set these and when deploying to a cloud app hosting service, you might
  set these in the dashboard for that service.

  - This file is listed in `.gitignore`, and will _only_ be required
    in your _development_ environment
  - Its purpose is to attach the environment variables (often secret) that you
    will use while developing. In production it will use the env variables
    set in the server environment. On Heroku you can set these in the
    dashboard. On your local NAS, you can either set the variables or
    use a .env file. Just don't have the .env file on GitHub or in a public
    directory.
  - It's **very** important that you **not** push it to Github!
    Otherwise, _prying eyes_ will find your secret API keys!
  - It might look like this:

    ```
    GOOGLE_CLIENT_ID="hush hush"
    GOOGLE_CLIENT_SECRET="pretty secret"
    GOOGLE_CALLBACK="/auth/google/callback"
    ```

  - You can also set variables here that are relevant only to development and
    not necessarily secret:

    ```
    PORT=8080
    ```

## Linting

Linters are fundamental to any project. They ensure that your code
has a consistent style, which is critical to writing readable code.

This boilerplate comes with a working linter (ESLint, with
`eslint-config-fullstack`) "out of the box." Any linter rule that you
object to can be "turned off" in `.eslintrc.json`. You may also choose
an entirely different config if you don't like this one.

## Styling (SASS, SCSS, CSS)

This boilerplate is set up to use compiled SASS for client styling. See
the `style.scss` file in the /client directory. It is configured to use
Bootstrap CSS and Bootstrap Icons. Apply your custom CSS tweaks in
this file or import your own CSS into this file.

Should you wish to use a framework other than Bootstrap, or remove
Bootstrap and entirely brew your own, no worries, but be advised that
the React components included in this boilerplate depend on Bootstrap
style classes - you will need to tweak the components accordingly.

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment

Ready to go world wide? Here's a guide to deployment. You can set up
many application hosting services to automatically update the live app
whenever your main/master branch on GitHub is updated. If you do this, be
sure your webpack files `bundle.js` and `bundle.js.map` are pushing up
as well and not being sidestepped by your .gitignore file.

There is a deployment script included in this boilerplate as well if you
are not taking the approach above. It involves pushing your code to a git
remote you define on the production site. The remaineder of this section
involes doing that.

- BE SURE TO EDIT the last line of `./script/deploy` !!!

Then run the deploy script:

`npm run deploy`

If you get a "Permission denied" error it may mean you don't have execute
permissions on the "deploy" script. If this happens, navigate to the
directory that this script is in and from there, give yourself execute
permission by typing "sudo chmod +x deploy" in the console.

Then your local copy of the application can be pushed up to a remote at will,
using the included handy deployment script, by running `npm run deploy`. It's
not automatic with every code merge; it only deploys when you run the script.

This is what it the script does (note you can do this one line at a time in
the terminal rather than running the script if preferred):

1.  Before running, make sure that all your work is fully committed and merged
    into your master branch on Github.
2.  And if you currently have an existing branch called "deploy", delete
    it now (`git branch -d deploy`). We will use a dummy branch
    with the name `deploy` (see below).
3.  Now deploy your code (the script runs these commands for you):
    _ `git checkout -b deploy`: checks out a new branch called
    `deploy`. Note that the name `deploy` here is not magical, but it needs
    to match the name of the branch we specify when we push to our production
    remote.
    _ `webpack -p`: webpack will run in "production mode"
    _ `git add -f public/bundle.js public/bundle.js.map`: "force" add
    these files which are listed in `.gitignore`.
    _ `git commit --allow-empty -m 'Deploying'`: create/force a commit
    _ `git push --force <production remote> deploy:master`: push your local
    `deploy` branch to the `master` branch on the production remote
    _ `git checkout master`: return to your master branch
    \_ `git branch -D deploy`: remove the deploy branch

Now, you should be deployed! Don't forget to set the ENV variables in the
production environment if needed. Also, remember to seed any application
data if applicable.

Why do all of these steps? The big reason is because we don't want our
production server to be cluttered up with dev dependencies like
`webpack`, but at the same time we don't want our development
git-tracking to be cluttered with production build files like
`bundle.js`! By doing these steps, we make sure our development and
production environments both stay nice and clean!
