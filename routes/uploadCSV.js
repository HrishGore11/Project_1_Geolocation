const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");
const csvModel = require("../models/csv");
const csv = require("csvtojson");
const Multer = require("multer");

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = Multer({ storage: storage });
// router.get("/getCSVData", (req, res) => {
//   csvModel.find((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (data != "") {
//         res.json({ result: data });
//       } else {
//         res.json({ result: {} });
//       }
//     }
//   });
// });

router.get("/getCSVData", async (req, res) => {
  try {
    await csvModel.find((err, data) => {
      if (data != "") {
        res.json({ result: data });
      } else {
        res.json({ result: {} });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//////////////////////
var temp;

router.post("/postCSVData", upload.single("csv"), (req, res) => {
  //convert csvfile to jsonArray
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      console.log(jsonObj);
      for (let x = 0; x < jsonObj; x++) {
        temp = parseFloat(jsonObj[x]["Unit Price"]);
        jsonObj[x].Test1 = temp;
        temp = parseFloat(jsonObj[x]["Unit Cost"]);
        jsonObj[x].Test2 = temp;
        temp = parseFloat(jsonObj[x]["Total Revenue"]);
        jsonObj[x].Test3 = temp;
        temp = parseFloat(jsonObj[x]["Total Cost"]);
        jsonObj[x].Test4 = temp;
        temp = parseFloat(jsonObj[x]["Total Profit"]);
        jsonObj[x].Final = temp;
      }
      csvModel.insertMany(jsonObj, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
        }
      });
    });
});
module.exports = router;
