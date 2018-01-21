var express = require('express')
var ws = require('ws')
var fs = require('fs');
var multer = require('multer'); // v1.0.5
const http = require('http');

var app = express()
const path = require('path');

var upload = multer(); // for parsing multipart/form-data

app.use(express.static(path.join(__dirname, 'Images')));

app.get('/', function (req, res) {
   res.sendfile(__dirname + '/continuous.html');
})
app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
})

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})



wss.on('connection', function (ws) {


 ws.on('message', function(message) {
  var msg = message;
  if(true){



	//var base64Data = msg['data'].replace(/^data:image\/png;base64,/, "");
    


base64Data  =   msg.replace(/^data:image\/jpeg;base64,/, "");
base64Data  +=  base64Data.replace('+', ' ');
binaryData  =   new Buffer(base64Data, 'base64').toString('binary');


fs.writeFile("Images/out.jpg", binaryData, "binary", function (err) {
    // writes out file without error, but it's not a valid image



http.get('http://127.0.0.1:5000/articles', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    
ws.send(data);
  });
 
}).on("error", (err) => {

  console.log("Error: " + err.message);

});







});










    
  }
});



})
