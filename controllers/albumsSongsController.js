var db = require('../models');



function index(req, res) {
  // FILL ME IN !
}

function create(req, res) {
  var newSong = new db.Song({
    name: req.body.name,
    trackNumber: req.body.trackNumber,
    trackLength: req.body.trackLength
  });
  db.Album.find({_id: req.params.album}).populate('Song').exec(function(err,album){
    if (err){res.status(500).json("Error on our end in creating song");}
    else{
      album[0].songs.push(newSong);
      album[0].save();
      res.status(200).json(newSong);
    }
  });
}

function show(req, res) {
  db.Album.find({_id:req.params.album}).populate('Song').exec(function(err,album){
    if(err){res.status(500).json("Error on our end while showing songs");}
    else if (!album) {res.status(400).json("Sorry, couldn't find that album");}
    else {
      // console.log(album);
      // console.log(album[0].songs);
      res.status(200).json(album[0].songs);
    }
  });
}

function destroy(req, res) {
  console.log(req.params);
  db.Album.findOne({_id:req.params.album})
  .populate('Song')
  .exec(function(err,album){
    console.log(album);
    if (err) { res.status(500).json("Sorry, something went wrong on our end while trying to find that album for you."); }
    else if (!album) { res.status(400).json("Sorry, could not find the album you requested."); }
    else {
      album.songs.forEach(function(song){
        if (song._id.toString() === req.params.song) {
          console.log(song);
          var songId = song._id;
          song.remove(function(err,song){
            if (err) { console.log(err); }
            else {
              console.log("just deleted",songId);
              album.save();
              res.status(200).json(songId);
            }
          });
        }
      });
    }
  });
}

function update(req, res) {
  db.Album.findOne({ _id: req.params.album })
  .populate('Song')
  .exec(function(err,album){
    if (err) { res.status(500).json("Sorry, something went wrong on our end while trying to find that album for you."); }
    else if (!album) { res.status(400).json("Sorry, could not find the album you requested."); }
    else {
      console.log(album);
      album.songs.forEach(function(song){
        if (song._id.toString() === req.params.song) {
          song.name = req.body.name;
          song.trackNumber = req.body.trackNumber;
          song.trackLength = req.body.trackLength;
          song.save();
          album.save();
          console.log(song);
          res.status(200).json(song);
        }
      });
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
