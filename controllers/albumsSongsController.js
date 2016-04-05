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

}

function destroy(req, res) {

}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
