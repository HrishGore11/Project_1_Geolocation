const express = require("express");
const router = express.Router();
const excelModel = require("../models/excel");
const Multer = require("multer");
const XLSX = require("xlsx");
const Path = require("path");
const BodyParser = require("body-parser");
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
