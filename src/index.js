const start_server = require('./server')
const config = require('./config')
const routes = require('./server/routes')
const db = require('./utils/db')
const enable_collect_socket = require('./utils/enable_collect_socket')
const graceful_shutdown = require('./utils/graceful_shutdown')

let server = start_server(db, routes)
if (config.sigterm) {
  enable_collect_socket(server)
}
console.log(config)
server.listen(config.app.port)
console.log('sailors are docking on port %d', config.app.port)

if (config.sigterm) {
  process.on('SIGTERM', () => {
    setTimeout(() => {
      graceful_shutdown(server)
    }, config.readiness_probe_delay)
  })
}
