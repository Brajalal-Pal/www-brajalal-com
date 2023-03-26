const mongoose = require("mongoose");
const Visitor = require("../model/visitor-model");

exports.getVisitorInfo = async (req, res) => {
  const visitorInfo = await Visitor.find({});

  res.status(200).json({ count: visitorInfo.length });
};

exports.saveVisitorInfo = async (req, res) => {
  // console.log(":::", req.body);

  // res.send("Hi");

  const newVisitor = new Visitor(req.body);
  //console.log(newVisitor);

  newVisitor
    .save()
    .then((value) => {
      //console.log("Data inserted", value);
      return res.status(201).json(value);
    })
    .catch((err) => {
      console.log(err);
      return res.status(201).json({
        status: "failed",
      });
    });
};
