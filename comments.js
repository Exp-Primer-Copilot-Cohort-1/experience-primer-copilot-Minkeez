// Create web server
// Use express.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var fileName = "comments.json";

// Get the comment data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get the comments from the file
app.get('/comments', function (req, res) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading the file');
            return;
        }

        res.send(data);
    });
});

// Post the comment data
app.post('/comments', function (req, res) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading the file');
            return;
        }

        var comments = JSON.parse(data);
        comments.push(req.body);

        fs.writeFile(fileName, JSON.stringify(comments), function(err) {
            if (err) {
                console.log(err);
                res.status(500).send('Error writing the file');
                return;
            }

            res.send('Comment added');
        });
    });
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});