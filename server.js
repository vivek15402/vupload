const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); 


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/videos');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('video'), (req, res) => {
    res.send('Video uploaded successfully.');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
