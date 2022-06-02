const Mongoose = require("mongoose");
const excelSchema = new Mongoose.Schema({
  name: String,
  class: Number,
  subject: String,
});

const excelModel = Mongoose.model("excelData", excelSchema);
module.exports = excelModel;
