const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authorizationsMiddleware = {
  accessPass: (request, response, next) => {
    try {
      let token;
      if (request.headers.authorization) {
        token = request.headers.authorization.split(" ")[1];
        let decode = jwt.verify(token, process.env.JWT_SECRET_HASH_KEY);
        request.payload = decode;
        console.log(token, decode);
        next();
      } else {
        response.json({
          message: "Server need a token",
        });
      }
      //catching errors from header
    } catch (error) {
      console.log(error);
      if (error && error.name === "JsonWebTokenError") {
        next(new createError(400, `${error.name}: Token invalid`));
      } else if (error && error.name === "TokenExpiredError") {
        next(new createError(400, `${error.name}: Token expired`));
      } else {
        next(new createError(400, `${error.name}: Token not active`));
      }
    }
  },
};

module.exports = authorizationsMiddleware;
