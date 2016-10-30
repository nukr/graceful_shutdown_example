function Socket () {
  this._sockets = {}
}

Socket.prototype.add = function add (key, value) {
  this._sockets[key] = value
}

Socket.prototype.each = function each (cb) {
  Object.keys(this._sockets).forEach((key) => {
    cb(this._sockets[key])
  })
}

Socket.prototype.close = function close (cb) {
  let done = true
  this.each((socket) => {
    if (!socket.destroyed) {
      socket.destroy()
      done = false
    }
  })
  if (done) {
    cb()
  } else {
    console.log('not done yet waiting for 1 sec')
    setTimeout(() => {
      close.call(this, cb)
    }, 1000)
  }
}

module.exports = new Socket()
