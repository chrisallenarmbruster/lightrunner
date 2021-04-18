//Instantiate and initiallize tables - this uses a class that has CRUD methods
//and is persistent through storage to the local filesystem rather than a database
const FileDbTable = require('./FileDbTable')

const User = new FileDbTable('user.json')
//Insert other persistent tables to storee to filesystem here.

module.exports = {User}
