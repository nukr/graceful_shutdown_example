const start_server = require('./server')
const config = require('./config')
const routes = require('./server/routes')
const db = require('./utils/db')
const enable_collect_socket = require('./utils/enable_collect_socket')
const graceful_shutdown = require('./utils/graceful_shutdown')

let server = start_server(db, routes)
server.listen(config.app.port)
console.log('sailors are docking on port %d', config.app.port)

// collect socket, handle SIGTERM and shutdown gracefully
enable_collect_socket(server)

process.on('SIGTERM', () => {
  graceful_shutdown()
})
