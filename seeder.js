const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/.env",
});


const Admin = require("./models/Admin");


// This is seeding to the local db 
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const admin = JSON.parse(
  fs.readFileSync(`${__dirname}/data/adminData.json`, "utf8")
);


const importData = async () => {
  try {
    await Admin.create(admin);
    
    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
// Destroy Data in database
// @desc This function deletes all the data in the database

const deleteData = async () => {
  try {
    await Admin.deleteMany();
    
   
    console.log("Data deleted successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
// Identify if delete or Import
if (process.argv[2] === "i") {
  importData();
} else if (process.argv[2] === "d") {
  deleteData();
}
