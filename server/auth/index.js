const router = require('express').Router()
const {User} = require('../fileDb')
module.exports = router

const correctPassword = (password, attempt) => {
  return password === attempt
}

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOneByKeyValue('email', req.body.email)
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Bad email/password')
    } else if (!correctPassword(user.password, req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Bad email/password')
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)))
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
      user = await User.create(req.body)
      req.login(user, (err) => (err ? next(err) : res.json(user)))
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
  res.json(req.user)
})

router.use('/google', require('./google'))
