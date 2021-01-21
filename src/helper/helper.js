module.exports = {
  response: (res, status, msg, data) => {
    const result = {}
    result.status = status || 200
    result.msg = msg
    result.data = data

    return res.status(result.status).json(result)
  }
}
