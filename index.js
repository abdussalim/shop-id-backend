require("dotenv").config();
const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

const express = require("express");
const app = express();
const mainRouter = require("./src/routes/mainroutes");

const createError = require("http-errors");
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

app.use("/main", mainRouter);

app.all("*", (request, response, next) => {
  next(new createError.NotFound());
});
app.use((error, request, response, next) => {
  const messageError = error.message || "internal server error";
  const statusCode = error.status || 500;

  response.status(statusCode).json({
    message: messageError,
  });
});

app.listen(PORT, () => {
  console.log(`server running on http://${DB_HOST}:${PORT}/main`);
});
