const parseResponse = (statusCode, message, result) => {
  const type = statusCode >= 200 && statusCode < 300 ? "success" : "error";
  const status_code = statusCode;

  return { type, status_code, message, result };
};

const responseHandler = (req, res, next) => {
  res.apiSuccess = (message, result, statusCode = 200) => {
    const successResponse = parseResponse(statusCode, message, result);
    res.status(200).json(successResponse);
  };

  res.apiError = (message, statusCode, result) => {
    const errorResponse = parseResponse(statusCode, message, result);
    res.status(statusCode).json(errorResponse);
  };

  next();
};

export default responseHandler;
