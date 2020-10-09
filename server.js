const express = require("express");
const dotenv = require("dotenv");
const auth = require("./routers/auth-route");
const createDBConnection = require("./config/db-config");

dotenv.config({ path: "./config/.env" });

const app = express();

app.use("/", auth);

// connect to Database
createDBConnection();

const PORT = process.env.PORT || 5000;

const SERVER = app.listen(PORT, () =>
  console.log(`Server running  on  port ${PORT}.`)
);
process.on("unhandledRejection", (error, promise) => {
  console.log(error.message);
  SERVER.close(() => process.exit(1));
});
