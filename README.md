# boilerplate-pern

_Good things come in pairs_

Looking to mix up a backend with `express`/`sequelize` and a frontend with
`react`/`redux`? That's `boilerplate-pern`!

## Customize

- Update project name and description in `package.json`
- `npm install`
- Create two postgres databases, one with the same name as how it was named in
  package.json and the other with "-test" appended to the name.
  (`MY_APP_NAME` should match the `name` parameter in `package.json`):

  ```
  export MY_APP_NAME=<'name' parameter in package.json>
  createdb $MY_APP_NAME
  createdb $MY_APP_NAME-test
  ```

- By default, running `npm test` will use `MY_APP_NAME-test`, while
  regular development uses `MY_APP_NAME`
- Either use node module "dotenv" or create a file called `secrets.js`
  in the project root. If using `secrets.js`

  - This file is listed in `.gitignore`, and will _only_ be required
    in your _development_ environment
  - Its purpose is to attach the secret environment variables that you
    will use while developing
  - However, it's **very** important that you **not** push it to
    Github! Otherwise, _prying eyes_ will find your secret API keys!
  - It might look like this:

  ```
  process.env.GOOGLE_CLIENT_ID = 'hush hush'
  process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
  process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

## Linting

Linters are fundamental to any project. They ensure that your code
has a consistent style, which is critical to writing readable code.

This boilerplate comes with a working linter (ESLint, with
`eslint-config-fullstack`) "out of the box." Any linter rule that you
object to can be "turned off" in `.eslintrc.json`. You may also choose
an entirely different config if you don't like this one:

- [Standard style guide](https://standardjs.com/)
- [Airbnb style guide](https://github.com/airbnb/javascript)
- [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment

Ready to go world wide? Here's a guide to deployment!

- [EDIT] the last line of ./script/deploy !!!

Then your local copy of the application can be pushed up to a remote at will,
using the included handy deployment script:

1.  Make sure that all your work is fully committed and merged into your
    master branch on Github.
2.  If you currently have an existing branch called "deploy", delete
    it now (`git branch -d deploy`). We will use a dummy branch
    with the name `deploy` (see below), so and the script below will error if a
    branch with that name already exists.
3.  `npm run deploy`
    _ this will cause the following commands to happen in order:
    _ `git checkout -b deploy`: checks out a new branch called
    `deploy`. Note that the name `deploy` here is not magical, but it needs
    to match the name of the branch we specify when we push to our production
    remote.
    _ `webpack -p`: webpack will run in "production mode"
    _ `git add -f public/bundle.js public/bundle.js.map`: "force" add
    these files which are listed in `.gitignore`.
    _ `git commit --allow-empty -m 'Deploying'`: create a commit, even
    if nothing changed
    _ `git push --force <production remote> deploy:master`: push your local
    `deploy` branch to the `master` branch on the production remote
    _ `git checkout master`: return to your master branch
    _ `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our
production server to be cluttered up with dev dependencies like
`webpack`, but at the same time we don't want our development
git-tracking to be cluttered with production build files like
`bundle.js`! By doing these steps, we make sure our development and
production environments both stay nice and clean!
