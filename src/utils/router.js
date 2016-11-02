module.exports = function router (routes) {
  return function (req, res) {
    const method = req.method.toLowerCase()
    if (routes[method][req.url]) {
      routes[method][req.url](req, res)
    } else {
      setTimeout(() => {
        res.end('doing something take long time ...')
      }, 1000)
    }
  }
}
