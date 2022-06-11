const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");
const excelModel = require("../models/excel");
const Multer = require("multer");
const XLSX = require("xlsx");
const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = Multer({ storage: storage });
router.get("/getexcelData", (req, res) => {
  excelModel.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data != "") {
        res.json({ result: data });
      } else {
        res.json({ result: {} });
      }
    }
  });
});
//////////////////////////////////////////////////
router.post("/updateData/:id", async (req, res) => {
  const { name, subject } = req.body;
  try {
    // Create a newNote object
    const newData = {};
    if (name) {
      newData.name = name;
    }
    // if (class) { newPro.description = description };
    if (subject) {
      newData.subject = subject;
    }

    // Find the product to be updated and update it
    let data = await excelModel.findById(req.params.id);
    console.log(data);
    if (!data) {
      return res.status(404).send("Not Found");
    }
    data = await excelModel.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
//////////////////////////////////////////////////////////////////////
router.delete("/deletedata/:id", async (req, res) => {
  try {
    const id = Mongoose.Types.ObjectId(req.params.id.trim());
    console.log(id);
    let data = await excelModel.findById(id);
    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }
    data = await excelModel.findByIdAndDelete(id);
    res.json({ message: "data has been deleted successfully", data });
  } catch (error) {
    console.log(error);
    res.json({ message: "Intenal server error" });
  }
});
/////////////////////////////////////////////////////////////////////
router.post("/postexcelData", upload.single("excel"), (req, res) => {
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  var x = 0;
  sheet_namelist.forEach((element) => {
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    excelModel.insertMany(xlData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        // res.json({ data: data });
      }
    });
    x++;
  });
  // res.redirect("/getexcelData");
  // res.json({ data: xldata });
});

module.exports = router;
