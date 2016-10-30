const countdown = require('./countdown')

module.exports = function enhance (server) {
  let sockets = {}
  server.on('connection', (socket) => {
    sockets[`${socket.remoteAddress}:${socket.remotePort}`] = socket
  })
  let todos = {
    close_socket: {
      done: false
    },
    close_db: {
      done: false
    }
  }
  process.on('SIGTERM', () => {
    close_socket(sockets, () => {
      console.log('all socket closed')
      todos.close_socket.done = true
      check_todos(todos)
    })
    close_db(() => {
      console.log('all db closed')
      todos.close_db.done = true
      check_todos(todos)
    })
  })
}

function close_socket (sockets, cb) {
  let done = true
  Object.keys(sockets).forEach((key) => {
    if (!sockets[key].destroyed) {
      sockets[key].destroy()
      done = false
    }
  })
  if (done) {
    cb()
  } else {
    console.log('not done yet waiting for 1 sec')
    setTimeout(() => {
      close_socket(sockets, cb)
    }, 1000)
  }
}

function close_db (cb) {
  countdown(10, cb)
}

function check_todos (todos) {
  let all_done = true
  Object.keys(todos).forEach((key) => {
    if (!todos[key].done) {
      all_done = false
    }
  })
  if (all_done) {
    process.exit(0)
  }
}
