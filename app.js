const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "pug");
app.set("views", "views")
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Visitor",
{ useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false });

// definimos el schema
var schema = mongoose.Schema({date:Date,name:String});
// definimos el modelo
var Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {
  const name = (req.query.name == undefined || req.query.name == '') ? 'Anónimo' : req.query.name
  let visitor = new Visitor({ date: Date.now(), name: name })
  visitor.save(function(err, visitor) {
    if (err) return console.error(err);
    res.send('<h1>El visitante fue almacenado con éxito</h1>');
  });
});

app.listen(3000, () => console.log('Listening on port 3000!'));
