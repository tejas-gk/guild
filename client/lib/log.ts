const log = (function (environment) {
  if (environment === "production") {
    return () => { }
  }
  return (...args) => {
    console.log(...args)
  }
})(process.env.NODE_ENV);


export {
  log
}