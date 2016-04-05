// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var albumsList =[
  // put data here!
  {
     artistName: 'Ladyhawke',
     name: 'Ladyhawke',
     releaseDate: '2008, November 18',
     image: 'https://frickafrickafresh.files.wordpress.com/2014/02/recordplayer.jpg',
     genres: [ 'new wave', 'indie rock', 'synth pop' ]
   },
   {
     artistName: 'The Knife',
     name: 'Silent Shout',
     releaseDate: '2006, February 17',
     image: 'https://frickafrickafresh.files.wordpress.com/2014/02/recordplayer.jpg',
     genres: [ 'synth pop', 'electronica', 'experimental' ]
   },
   {
     artistName: 'Juno Reactor',
     name: 'Shango',
     releaseDate: '2000, October 9',
     image: 'https://frickafrickafresh.files.wordpress.com/2014/02/recordplayer.jpg',
     genres: [ 'electronic', 'goa trance', 'tribal house' ]
   },
   {
     artistName: 'Philip Wesley',
     name: 'Dark Night of the Soul',
     image: 'https://frickafrickafresh.files.wordpress.com/2014/02/recordplayer.jpg',
     releaseDate: '2008, September 12',
     genres: [ 'piano' ]
   }
];


var sampleSongs = [];

sampleSongs.push({ name: 'Swamped',
                   trackNumber: 1,
                   trackLength: "4:00"
});
sampleSongs.push({ name: "Heaven's a Lie",
                   trackNumber: 2,
                   trackLength: "4:00"
});
sampleSongs.push({ name: 'Daylight Dancer',
                   trackNumber: 3,
                   trackLength: "4:00"
});
sampleSongs.push({ name: 'Humane',
                   trackNumber: 4,
                   trackLength: "4:00"
});
sampleSongs.push({ name: 'Self Deception',
                   trackNumber: 5,
                   trackLength: "4:00"
});
sampleSongs.push({ name: 'Aeon',
                   trackNumber: 6,
                   trackLength: "4:00"
});
sampleSongs.push({ name: 'Tight Rope',
                   trackNumber: 7,
                   trackLength: "4:00"
});

albumsList.forEach(function(el){
  el.songs = sampleSongs;
});

db.Album.remove({}, function(err, albums){

  db.Album.create(albumsList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    // console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});
