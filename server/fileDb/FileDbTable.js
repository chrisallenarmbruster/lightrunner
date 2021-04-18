const fse = require('fs-extra')
const path = require('path')

//this class implements basic CRUD capabilities against the filesystem,
//as opposed to a database when scale permits and it is not practical or
//desirable to have a database involved.  Note that this is very basic
//and does not offer relationships between tables.  Create an object
//for each table desired.  The constructor expects a file name for
//where it will store the table.

class FileDbTable {
  constructor(fileName) {
    this.file = path.join(__dirname, '/data/', fileName)
    this.lastPk = 0
    this.data = []
  }

  async init() {
    const exists = await fse.pathExists(this.file)
    if (exists) {
      try {
        const jsonFile = await fse.readJson(this.file)
        this.data = [...jsonFile.data]
        this.lastPk = jsonFile.lastPk
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        await fse.writeJson(this.file, {lastPk: 0, data: []})
      } catch (err) {
        console.error(err)
      }
    }
  }

  async reset() {
    try {
      this.lastPk = 0
      this.data = []
      await fse.writeJson(this.file, {lastPk: 0, data: []})
    } catch (err) {
      console.error(err)
    }
  }

  findAll() {
    return this.data
  }
  FileDbTable
  async findById(id) {
    const data = await this.data.find((element) => element.id === id)
    if (data) {
      return data
    } else {
      return null
    }
  }

  async findAllByKeyValue(key, value) {
    const recordSet = await this.data.filter(
      (element) => element[key] === value
    )
    return recordSet
  }

  async findOneByKeyValue(key, value) {
    const record = await this.data.find((element) => element[key] === value)
    return record ? record : null
  }

  async create(data) {
    this.data.push({id: ++this.lastPk, ...data})
    try {
      await fse.writeJson(this.file, {lastPk: this.lastPk, data: this.data})
    } catch (err) {
      console.error(err)
    }
    return this.data[this.data.length - 1]
  }

  async delete(id) {
    if (await this.findById(id)) {
      this.data = this.data.filter((element) => {
        if (element.id !== id) {
          return element
        }
      })
      try {
        await fse.writeJson(this.file, {lastPk: this.lastPk, data: this.data})
        console.log(`Deleted one record with id of ${id}.`)
        return 1
      } catch (err) {
        console.error(err)
      }
    } else {
      console.log('Cannot Delete record for unknown id.')
      return 0
    }
  }

  async update(id, data) {
    let record = await this.findById(id)
    let index = this.data.findIndex((element) => element.id === id)
    if (record) {
      record = {...record, ...data}
      this.data[index] = {...record}
      await fse.writeJson(this.file, {lastPk: this.lastPk, data: this.data})
      return record
    } else {
      console.log('Cannot Update record for unknown id.')
      return null
    }
  }
}

module.exports = FileDbTable
