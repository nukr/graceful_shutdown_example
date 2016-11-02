const sockets = require('./sockets')
const db = require('./db')

function check_todos (todos) {
  let all_done = true
  Object.keys(todos).forEach((key) => {
    if (!todos[key].done) {
      all_done = false
    }
  })
  if (all_done) {
    console.log('all done process.exit(0)')
    process.exit(0)
  }
}

module.exports = function graceful_shutdown (server) {
  let todos = {
    close_socket: {
      done: false
    },
    close_db: {
      done: false
    },
    close_server: {
      done: false
    }
  }
  sockets.close(() => {
    console.log('all socket closed')
    todos.close_socket.done = true
    check_todos(todos)
  })
  db.close(() => {
    console.log('all db closed')
    todos.close_db.done = true
    check_todos(todos)
  })
  server.close(() => {
    console.log('server closed')
    todos.close_server.done = true
    check_todos(todos)
  })
}
