export const ErrorHandle = async (error, req, res, next) => {
  //   console.log("hit");
  const statusCode = res.statusCode ? res.statusCode : 500;
  //   console.log(statusCode);
  return res.status(statusCode).json({
    message: error.message,
    stack: process.env.MY_ENV === "development" ? error.stack : null,
  });
};
