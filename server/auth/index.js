const router = require('express').Router()
const {User} = require('../fileDb')
const {setSaltAndPassword, correctPassword} = require('../fileDb/passwordTools')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOneByKeyValue('email', req.body.email)
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Bad email/password')
    } else if (!correctPassword(user, req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Bad email/password')
    } else {
      req.login(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          googleId: user.googleId,
        },
        (err) =>
          err
            ? next(err)
            : res.json({
                id: user.id,
                email: user.email,
                role: user.role,
              })
      )
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    let user = await User.findOneByKeyValue('email', req.body.email)
    if (user) {
      res.status(401).send('User already exists')
    } else {
      user = setSaltAndPassword(req.body)
      user = await User.create({
        email: user.email,
        role: 'user',
        password: user.password,
        salt: user.salt,
        googleId: '',
      })
      req.login(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          googleId: user.googleId,
        },
        (err) =>
          err
            ? next(err)
            : res.json({
                id: user.id,
                email: user.email,
                role: user.role,
              })
      )
    }
  } catch (err) {
    next(err)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json({id: req.user.id, email: req.user.email, role: req.user.role})
})

router.use('/google', require('./google'))
