const sockets = require('./sockets')

module.exports = function enhance (server) {
  server.on('connection', (socket) => {
    sockets.add(`${socket.remoteAddress}:${socket.remotePort}`, socket)
  })
}

