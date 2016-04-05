// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
var bodyParser = require('body-parser');
// generate a new express app and call it 'app'
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');
var db = require('./models');




/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/albums', controllers.albums.index);

app.post('/api/albums', controllers.albums.create);

app.post('/api/albums/:album/songs', controllers.songs.create);

app.get('/api/albums/:album', controllers.albums.show);

app.delete('/api/albums/:album', controllers.albums.destroy);

app.put('/api/albums/:album', controllers.albums.update);

/*
 * JSON API Endpoints
 */



app.get('/api', controllers.api.index);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
