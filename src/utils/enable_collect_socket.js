const sockets = require('./sockets')

module.exports = function enhance (server) {
  server.on('connection', (socket) => {
    const id = `${socket.remoteAddress}:${socket.remotePort}`
    sockets.add(id, socket)
    socket.on('close', () => {
      sockets.delete(id)
    })
  })
}

