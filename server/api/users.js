const router = require('express').Router()
const {User} = require('../fileDb')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    const usersSubset = users.map((element) => ({
      id: element.id,
      email: element.email,
      role: element.role,
    }))
    res.json(usersSubset)
  } catch (err) {
    next(err)
  }
})
