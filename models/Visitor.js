const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  //date:Date,
  name:String,
  count:Number
});

module.exports = mongoose.model("Visitor", schema);
