const multiconfig = require('@nukr/multiconfig')

module.exports = multiconfig.default({
  app: {
    port: 3000
  },
  sigterm: true,
  readiness_probe_delay: 4000
})
