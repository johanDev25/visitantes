const express = require('express');
const app = express();
const mongoose = require("mongoose");

const Visitor = require("./models/Visitor")
app.set("view engine", "pug");
app.set("views", "views")
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error",function(e){console.error(e);});

app.get('/', async (req, res) => {
  const name = (req.query.name == undefined || req.query.name == '') ? 'Anónimo' : req.query.name
  const data ={
    date: Date.now(),
    name: name
  }
  try {
    const visitor = new Visitor(data);
    await visitor.save();
    console.log(visitor)
  } catch (e) {
    return next(e)
  }
   res.send('<h1>El visitante fue almacenado con éxito</h1>');
});

app.listen(3000, () => console.log('Listening on port 3000!'));
