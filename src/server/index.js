const http = require('http')
const router = require('../utils/router')

module.exports = function start_server (db, routes) {
  return http.createServer(router(routes))
}

