module.exports = function router(routes) {
  return function (req, res) {
    const method = req.method.toLowerCase()
    if (routes[method][req.url]) {
      routes[method][req.url](req, res)
    } else {
      res.write("not found", 404)
      res.end()
    }
  }
}
