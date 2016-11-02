const config = require('../../config')

module.exports = {
  get: {
    '/readiness': get_readiness_handler,
    '/healthz': get_health_check_handler
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
    res.write('Me busy. Leave me alone!!', 500)
    res.end()
  } else {
    res.end('Ready to work.')
  }
}

function get_health_check_handler (req, res) {
  res.end('Work, work.')
}
