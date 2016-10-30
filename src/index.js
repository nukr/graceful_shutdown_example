const start_server = require('./server')
const config = require('./config')
const routes = require('./server/routes')
const enhance = require('./utils/enhance')

const db = {}
let server = start_server(db, routes)

// collect socket, handle SIGTERM and shutdown gracefully
enhance(server)

server.listen(config.app.port)
console.log('sailors are docking on port %d', config.app.port)
