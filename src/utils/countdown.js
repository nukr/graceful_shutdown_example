module.exports = function countdown (t, cb) {
  console.log(`final countdown for ${t} secs ...`)
  if (t === 0) {
    console.log('BOOM!')
    cb()
  } else {
    setTimeout(() => {
      countdown(t - 1, cb)
    }, 1000)
  }
}
