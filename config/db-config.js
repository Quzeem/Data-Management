const mongoose = require("mongoose");

const createDBConnection = async () => {
  const DB = process.env.DB_URI || DB_URI;
  const connect = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  console.log(`Mongodb Connected to ==>  ${connect.connection.host}`);
};
module.exports = createDBConnection;
