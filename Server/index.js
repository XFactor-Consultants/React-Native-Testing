const express = require('express')
const fs = require('fs').promises
const url = require('url');
const app = express();
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ' - ' + file.originalname)
    }
  });
  const upload = multer({storage: storage})
const bodyParser = require('body-parser')

app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', upload.single('file'), function(req, res) {
    if(req.file){
        const filename = req.file.filename
        const url = `http://${req.headers.host}/file/${filename}`
        const header = "<h1>File uploaded as "+req.file.filename+"</h1>"
        const subheader = `<h2><a href="${url}">${url}</a></h2>`
        const qrlibrary = "<script src='https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js'></script>"
        const qr = `<div id='qrcode'></div><script type="text/javascript">new QRCode(document.getElementById('qrcode'), encodeURI('${url}'));</script>`
        res.status(200).send(header+subheader+qrlibrary+qr)
    }
    else
        res.status(400).send("No file specified!")
});

app.post('/api/upload', upload.single('file'), function(req, res) {
  if(req.file){
      const filename = req.file.filename
      const url = `http://${req.headers.host}/file/${filename}`
      return res.status(200).send(url)
  }
  else
      res.status(400).send("No file specified!")
});

app.get('/file/:name', function(req, res) {
    res.sendFile(__dirname + '/uploads/'+req.params.name)
  });

app.listen(8000);