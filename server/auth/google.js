const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../fileDb')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, use a file called `.env` in your root directory, which will
 * set these environment variables like so:
 *
 * GOOGLE_CLIENT_ID="your google cli"googleId",googleIdnt id"
 * GOOGLE_CLIENT_SECRET="your google client secret"
 * GOOGLE_CALLBACK="/your/google/callback"
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    async (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const email = profile.emails[0].value
      const imgUrl = profile.photos[0].value
      const firstName = profile.name.givenName
      const lastName = profile.name.familyName
      const fullName = profile.displayName

      try {
        let user = await User.findOneByKeyValue('googleId', googleId)
        if (!user) {
          user = await User.create({
            email: email,
            role: 'user',
            password: '',
            salt: '',
            googleId: googleId,
          })
        }
        done(null, user)
      } catch {
        done()
      }

      // User.findOrCreate({
      //   where: {googleId},
      //   defaults: {email, imgUrl, firstName, lastName, fullName},
      // })
      //   .then(([user]) => done(null, user))
      //   .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('google', {scope: ['email', 'profile']})
  )

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login',
    })
  )
}
