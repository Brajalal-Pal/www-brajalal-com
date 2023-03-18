const mongoose = require("mongoose");
const Visitor = require("../model/visitor-model");

exports.getVisitorInfo = async (req, res) => {
  const visitorInfo = await Visitor.find({});

  res.status(200).json(visitorInfo);
};

exports.saveVisitorInfo = async (req, res) => {
  const newVisitor = new Visitor({ date: new Date().toISOString() });

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
