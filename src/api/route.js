const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");
let data = require("../files/UserData.json");

route.get("/getdata", (req, res) => {
  res.send(data);
});

route.post("/savedata", (req, res) => {
  if (
    req.body.userId.trim() !== "" &&
    req.body.firstName.trim() !== "" &&
    req.body.lastName.trim() !== "" &&
    req.body.birthDate.trim() !== ""
  ) {
    let userDetail = {
      userId: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
    };
    console.log(userDetail);
    console.log(__dirname);
    fs.readFile("./src/files/UserData.json", "utf8", function readFileCallback(
      err,
      data
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        obj = JSON.parse(data); //now it an object
        console.log(obj.data);
        obj.data.push(userDetail); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile("./src/files/UserData.json", json, "utf8", function (err) {
          if (err) throw err;
          console.log("COMPLETE");
        });
      }
    });
  }
});

module.exports = route;
