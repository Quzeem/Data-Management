const mongoose = require("mongoose");

const createDBConnection = async () => {
  const connect = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  console.log(`Mongodb Connected to ${connect.connection.host}`);
};
module.exports = createDBConnection;
