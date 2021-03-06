// Create a variable called express
// Notify the app that it needs express framework
var express = require("express");
// Bootstrap the app to express
var app = express();
// Run this app on port 3000
var port = 3000;

// Body parser is a module in express package that helps apps
// parse data in HTTP req body
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Create a variable called mongoose
// Notify the app that it needs mongoose framework
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// Connect the app to the db in the specified location
mongoose.connect("mongodb://localhost:27017/phone-book-app");

var phoneBookSchema = new mongoose.Schema({
  firstName: String,
  phoneNumber: { type: Number },
  created_at: { type: Date, default: Date.now() }
});
var PhoneBook = mongoose.model("PhoneBookApp", phoneBookSchema);

// Binding root context that is localhost:3000
// to get method that responds with index.html file
// req - HTTP request made by client
// res - HTTP response
app.get("/", (req, res) => {
  // sendFile is a method in express framework that sends file back
  // to the client
  res.sendFile(__dirname + "/index.html");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.post("/savePhoneBook", (req, res) => {
  var myData = new PhoneBook(req.body);
  myData
    .save()
    .then(item => {
      res.send("Phone book info saved to database");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Informing your app to listen to port number you have provided on top
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
