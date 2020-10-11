const express = require("express");
const dotenv = require("dotenv");


const createDBConnection = require("./config/db-config");
const auth = require("./routes/auth");
const guard = require("./routes/guard");

dotenv.config({ path: "./config/.env" });

const app = express();

app.use(express.json())

app.use("/", auth);
app.use("/auth", guard);

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
