module.exports = {
  get: {
    '/readiness': get_readiness_handler,
    '/healthz': get_health_check_handler
  }
}

let state = {
  is_shutdown: false
}

process.on('SIGTERM', function () {
  state.is_shutdown = true
})

function get_readiness_handler (req, res) {
  if (state.is_shutdown) {
    res.write('server is going down', 500)
    res.end()
  } else {
    res.end('hihi')
  }
}

function get_health_check_handler (req, res) {
  res.end('ok')
}
