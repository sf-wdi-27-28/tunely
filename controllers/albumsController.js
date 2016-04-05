/************
 * DATABASE *
 ************/
 var db = require('../models');



/* hard-coded data */
var albums = [];
albums.push({
              _id: 132,
              artistName: 'Nine Inch Nails',
              name: 'The Downward Spiral',
              releaseDate: '1994, March 8',
              genres: [ 'industrial', 'industrial metal' ]
            });
albums.push({
              _id: 133,
              artistName: 'Metallica',
              name: 'Metallica',
              releaseDate: '1991, August 12',
              genres: [ 'heavy metal' ]
            });
albums.push({
              _id: 134,
              artistName: 'The Prodigy',
              name: 'Music for the Jilted Generation',
              releaseDate: '1994, July 4',
              genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
            });
albums.push({
              _id: 135,
              artistName: 'Johnny Cash',
              name: 'Unchained',
              releaseDate: '1996, November 5',
              genres: [ 'country', 'rock' ]
            });


// GET /api/albums
function index(req, res) {
  db.Album.find({}, function(err,albums){
    if (err){ res.status(500).json("Sorry, error on our end!"); }
    else if(!albums){ res.status(400).json("Sorry, we couldn't find any albums"); }
    else{
      res.status(200).json(albums);
    }
  });
}



function create(req, res) {
  // console.log(req.body);
  var newAlbum = new db.Album({
    artistName: req.body.artistName,
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    image: req.body.image,
    genres: [req.body.genres]
  });
  newAlbum.save(function(err,album){
    if (err) {
      res.status(500).json("Sorry! Error on our end while creating that album");
    } else {
      res.status(200).json(album);
    }
  });
}

function show(req, res) {
  db.Album.findOne({_id:req.params.album}, function(err,album){
    if (err){ res.status(500).json("Sorry, something failed on our end while fnding that file."); }
    else if (!album) { res.status(400).json("Sorry, couldn't find that album"); }
    else{ res.status(200).json(album); }
  });
}

function destroy(req, res) {
  db.Album.findOneAndRemove({_id:req.params.album}, function(err,album){
    if(err){res.status(500).json("Sorry, something went wrong on our end while searching for that album.");}
    else if(!album){res.status(400).json("Sorry, we couldn't find that album");}
    else { res.status(200).json(album); }
  });
}

function update(req, res) {
  console.log("in update");
  console.log(req.params.album);
  db.Album.findOne({_id:req.params.album}, function(err,album){
    if(err){ res.status(500).json("Sorry, somthing went wrong on our end while searching to delete that album"); }
    else if(!album){ res.status(400).json("Sorry, we couldn't find that album to update it."); }
    else {
      album.name = req.body.name;
      album.artistName = req.body.artistName;
      album.releaseDate = req.body.releasedDate;
      album.save();
      res.status(200).json(album);
    }
  });
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
