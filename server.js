var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();

const http = require('http');
app.use(bodyParser.json());


 var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });



 

 var upload = multer({
     storage: Storage
 }).single("imgUploader"); //Field name and max count


 app.get("/", function(req, res) {
     res.sendFile(__dirname + "/index.html");
 });


 app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }


http.get('http://127.0.0.1:5000/articles?name='+res.req.file.filename, (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    
return res.end(data);
  });
 
}).on("error", (err) => {

  console.log("Error: " + err.message);
return res.end(err.message);
});

         



     });
 });

app.listen(2000, function(a) {
     console.log("Listening to port 2000");
 });
