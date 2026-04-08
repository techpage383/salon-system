const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    return next({
      statusCode: 400,
      message: result.error.issues.map((issue) => issue.message).join(", "),
    });
  }

  req.body = result.data.body;
  req.query = result.data.query;
  req.params = result.data.params;
  return next();
};

module.exports = validate;
