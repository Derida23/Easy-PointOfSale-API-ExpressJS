module.exports = {
  success: (res, status, result) => {
    let form = {
      status: status,
      data: result
    }
    res.json(form);
  },
  error: (res, status, result) => {
    let form = {
      status: status,
      data: result
    }
    res.json(form);
  },
};
