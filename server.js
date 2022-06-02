const express = require("express");
const app = express();
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/address", require("./routes/address"));

//connect to db
//fetch data from the request
//rmMik7KaWxPXmT7N
Mongoose.connect(
  "mongodb+srv://Hrishi:rmMik7KaWxPXmT7N@cluster0.ppyva.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use(BodyParser.urlencoded({ extended: false }));
app.use(express.static(Path.resolve(__dirname, "public")));
//collection schema

// app.get("/", (req, res) => {
//   excelModel.find((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (data != "") {
//         res.render("home", { result: data });
//       } else {
//         res.render("home", { result: {} });
//       }
//     }
//   });
// });

// app.post("/", upload.single("excel"), (req, res) => {
//   var workbook = XLSX.readFile(req.file.path);
//   var sheet_namelist = workbook.SheetNames;
//   var x = 0;
//   sheet_namelist.forEach((element) => {
//     var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
//     excelModel.insertMany(xlData, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     });
//     x++;
//   });
//   res.redirect("/");
// });

const Port = process.env.Port || 9045;
app.listen(Port, () => {
  console.log("server connected at " + Port);
});
