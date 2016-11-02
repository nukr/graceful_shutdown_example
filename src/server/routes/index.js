const os = require('os')
const config = require('../../config')

module.exports = {
  get: {
    '/readiness': get_readiness_handler,
    '/healthz': get_health_check_handler,
    '*': get_wildcard_handler
  }
}

let state = {
  is_shutdown: false
}

if (config.sigterm) {
  process.on('SIGTERM', function () {
    state.is_shutdown = true
  })
}

function get_readiness_handler (req, res) {
  if (state.is_shutdown) {
    res.setHeader('Connection', 'close')
    res.write('Me busy. Leave me alone!!', 500)
    res.end()
  } else {
    res.end('Ready to work.')
  }
}

function get_health_check_handler (req, res) {
  res.end('Work, work.')
}

function get_wildcard_handler (req, res) {
  const interfaces = os.networkInterfaces()
  Object.keys(interfaces).forEach((key) => {
    interfaces[key] = interfaces[key].filter((type) => {
      return !(type.internal || type.family === 'IPv6')
    }).map((filtered_type) => {
      return filtered_type.address
    })
  })
  Object.keys(interfaces).forEach((key) => {
    if (interfaces[key].length === 0) {
      delete interfaces[key]
    }
  })
  console.log(interfaces)
  const ips = JSON.stringify(interfaces, null, 2)
  if (state.is_shutdown) {
    res.setHeader('Connection', 'close')
    res.end(ips)
  } else {
    res.end(ips)
  }
}
