var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var fs = require('fs');
var http = require('http');
var formidable = require('formidable');
var fileUpload = require('express-fileupload');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

app.set('view engine', 'ejs');
//app.set('views',  '../views');

app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
  res.render("index");

});
app.post('/index', urlencodedParser, function (req, res) {
  console.log(req.body);
  res.render('index-success', { data: req.body });
});

// default options
app.use(fileUpload({ safeFileNames: /\\/g }))

app.post('/upload', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./datasets/data.csv', function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');

    converter.on("end_parsed", function (jsonArray) {
      console.log(jsonArray); //here is your result jsonarray
    });
  
    //read from file
    require("fs").createReadStream("./datasets/data.csv").pipe(converter);
  });
  
});








app.listen(8000);

