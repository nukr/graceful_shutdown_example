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
    process.exit(0)
  }
}

module.exports = function graceful_shutdown (server) {
  let todos = {
    close_db: {
      done: false
    },
    close_server: {
      done: false
    }
  }
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
