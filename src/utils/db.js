const countdown = require('./countdown')

const db = {}
db.close = function db_close (cb) {
  countdown(10, cb)
}

module.exports = db
