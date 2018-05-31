const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const http = require('http');
const PORT = 3000;
const socket = require('socket.io');

var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "5b9c096b7fc42039f5ffbe3738d0eeba",
        secret: "5c926691d81a1f7e",
        user_id: '157408260@N04'
    };

const getPhotoSets = (req, res) => {
    let id = req.body.id;
    console.log(req.body);
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        flickr.photosets.getPhotos({
            photoset_id: id,
            user_id: flickr.options.user_id,
            page: 1,
            per_page: 20,
            extras: 'description, license, owner_name, icon_server, original_format, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o'
        }, function(err, results) {
            if(err){
                res.send(`There was an error ${err}`)
                return false;
            }
            res.send(results);
        })
    });
}
app.post('/sets', jsonParser, (req, res) => {
    getPhotoSets(req, res)
});

app.get('/', (req, res) => {
    res.send('Hello World')
});
app.get('/name', (req, res) => {
    res.send('Hello World name')
});

let server = app.listen(PORT, () => console.log(`Server running at ${PORT}`));
const io = socket(server);
io.sockets.on('connection', (socket) => {
    socket.emit('hello', {
        greeting: 'Hello You!!'
    })
});