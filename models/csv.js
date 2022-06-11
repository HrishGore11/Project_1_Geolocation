const Mongoose = require("mongoose");
const csvSchema = new Mongoose.Schema({
  Region: String,
  Country: String,
  "Item Type": String,
  "Sales Channel": String,
  "Order Priority": String,
  "Order Date": String,
  "Order ID": Number,
  "Ship Date": String,
  "Units Sold": Number,
  "Unit Price": Number,
  "Unit Cost": Number,
  "Total Revenue": Number,
  "Total Cost": Number,
  "Total Profit": Number,
});

const csvModel = Mongoose.model("csvData", csvSchema);
module.exports = csvModel;
///////////////////////
