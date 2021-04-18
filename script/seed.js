'use strict'

const {User} = require('../server/fileDb')
const {setSaltAndPassword} = require('../server/fileDb/passwordTools')

async function seed() {
  await User.reset()

  const users = [
    {
      email: 'default@email.com',
      password: '123',
      googleId: null,
    },
    {
      email: 'user1@email.com',
      password: '123',
      googleId: null,
    },
    {
      email: 'user2@email.com',
      password: '123',
      googleId: null,
    },
  ]

  for (let i = 0; i < users.length; i++) {
    let user = await setSaltAndPassword(users[i])
    user = await User.create({
      email: user.email,
      password: user.password,
      salt: user.salt,
      googleId: user.googleId,
    })
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  await User.init()
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('seeding complete')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
