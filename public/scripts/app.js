/* CLIENT-SIDE JS
*
* You may edit this file as you see fit.  Try to separate different components
* into functions and objects as needed.
*
*/

var albumTemplate;
var $albumList;
var allAlbums = [];

var songTemplate;
var $songList;
var allSongs = [];

var newSongTemplate;

$(document).ready(function() {
  console.log('app.js loaded!');
  $albumList = $('#albums');
  var albumSource = $('#album-list').html();
  albumTemplate = Handlebars.compile(albumSource);
  $songList = $('#editSongsModalBody');
  var songSource = $('#song-list').html();
  songTemplate = Handlebars.compile(songSource);
  var newSongSource = $('#new-song-list').html();
  newSongTemplate = Handlebars.compile(newSongSource);


  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: albumSuccess,
    error: albumError
  });

  $("#addAlbumForm").on("submit", function(e){
    e.preventDefault();
    // console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: addAlbumSuccess,
      error: addAlbumError
    });
    $("#addAlbumForm").each(function(){
      this.reset();
    });
  });

  $('#albums').on('click', '.add-song', function(e){
    e.preventDefault();
    // console.log('Add Song Clicked');
    var id = $(this).closest('.album').data('album-id');
    // console.log("id: ",id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal();
  });

  $('#songModal').on('click', '#saveSong', function(e){
    handleNewSongSubmit(e);
    $('#songModal').modal('hide');
    $('#songModal').find('input').val('');
  });

  $('#albums').on('click', '.delete-album', function(e){
    e.preventDefault();
    var id = $(this).closest('.album').data('album-id');
    // console.log("id: ",id);
    $.ajax({
      method: 'DELETE',
      url: '/api/albums/' + id,
      success: handleDeleteAlbumSuccess,
      error: handleDeleteAlbumError
    });
  });

  $('#albums').on('click', '.edit-album', function(e){
    e.preventDefault();
    var id = $(this).closest('.album').data('album-id');
    console.log("id: ",id);
    $(this).toggleClass('hidden');
    $(this).closest('.album').find('.albumUpdate').toggleClass("hidden");
    $(this).closest('.album').find('.artistUpdate').toggleClass("hidden");
    $(this).closest('.album').find('.releaseDateUpdate').toggleClass("hidden");
    $(this).closest('.album').find('.album-name').toggleClass("hidden");
    $(this).closest('.album').find('.artist-name').toggleClass("hidden");
    $(this).closest('.album').find('.album-releaseDate').toggleClass("hidden");
    $(this).closest('.album').find('.save-album-changes').toggleClass("hidden");
  });

  $('#albums').on('click', '.save-album-changes', function(e){
    e.preventDefault();
    var id = $(this).closest('.album').data('album-id');
    // location.href = 'http://localhost:3000/api/albums/' + id;
    // console.log('/api/albums/' + id);
    // console.log("name:",$(this).closest('.album').find('.albumUpdate').val(),
    //         "artist:",$(this).closest('.album').find('.artistUpdate').val(),
    //         "releasedDate:",$(this).closest('.album').find('.releaseDateUpdate').val());
    $.ajax({
      method: 'PUT',
      url: '/api/albums/' + id,
      data: {
        name: $(this).closest('.album').find('.albumUpdate').val(),
        artistName: $(this).closest('.album').find('.artistUpdate').val(),
        releasedDate: $(this).closest('.album').find('.releaseDateUpdate').val()
      },
      success: handleUpdateAlbumSuccess,
      error: handleUpdateAlbumError
    });
    // $(this).toggleClass('hidden');
    // $(this).closest('.album').find('.edit-album').toggleClass("hidden");
  });

  $('#albums').on('click', '.edit-songs', function(e){
    e.preventDefault();
    var id = $(this).closest('.album').data('album-id');
    // console.log("id: ",id);
    $('#editSongsModal').data('album-id', id);
    $songList.empty();

    $.ajax({
      method: 'GET',
      url: '/api/albums/' + id + '/songs',
      success: handleSongsSuccess,
      error: handleSongsError
    });

    console.log($('#editSongsModal').data('album-id'));
    $('#editSongsModal').modal('show');
  });

  $('#editSongsModal').on('click', '.delete-song', function(e){
    e.preventDefault();
    if(!$(this).data('song-id')){
      console.log($(this).closest('.new-song-form'));
      $(this).closest('.song-form').remove();
    } else {
      var albumId = $('#editSongsModal').data('album-id');
      var songId = $(this).data('song-id');
      // console.log("albumid",albumId);
      // console.log("songid",songId);
      $.ajax({
        method: 'DELETE',
        url: '/api/albums/' + albumId + '/songs/' + songId,
        success: handleDeleteSongSuccess,
        error: handleDeleteSongError
      });
    }
  });


  $('#editSongsModal').on('click', '.update-songs', function(e){
    e.preventDefault();
    var argArr = [];
    var albumId = $('#editSongsModal').data('album-id');
    $('.song-form').each(function(index,value){
      if ($(this).find('.song-name').val()==="" || $(this).find('.song-trackNumber').val()==="" || $(this).find('.song-trackLength').val()==="") {
        console.log("inIF");
        return;
      } else if(!$(this).data('song-id')){
        console.log("data-id",$(this).data('song-id'));
        var ajaxPost = $.ajax({
          method: 'POST',
          url: '/api/albums/' + albumId + '/songs',
          data: $(this).serialize(),
          success: handleNewSongSuccess,
          error: handleNewSongError
        });
        argArr.push(ajaxPost);
      } else {
        console.log($(this).data('song-id'));
        var songId = $(this).data('song-id');
        var ajaxPut = $.ajax({
          method: 'PUT',
          url: '/api/albums/' + albumId + '/songs/' + songId,
          data: $(this).serialize(),
          success: handleSongUpdateSuccess,
          error: handleSongUpdateError
        });
        argArr.push(ajaxPut);
      }
    });
    ////// Update Songs all together (with new GET?) after all info is returned
    $.when.apply(null,argArr).always(function(){
      $.get('/api/albums/' + albumId).success(singleAlbumRemoveAndRender);
      $('#songModal').modal('hide');
    });
  });


  $('#editSongsModal').on('click', '.add-songs', function(e){
    e.preventDefault();
    $songList.append(newSongTemplate).preventDefault();

  });


});




function handleSongUpdateSuccess(song){
  console.log(song);
}

function handleSongUpdateError(err){
  console.log(err);
}

function handleDeleteSongSuccess(songId){
  console.log('success, deleted song id:',songId);
  $(document).find("[data-song-id='" + songId + "']").remove();
}

function handleDeleteSongError(err){
  console.log(err);
}


function handleSongsSuccess(songs){
  // console.log(songs);
  // $songList = $('#editSongsModalBody');
  // var songSource = $('#song-list').html();
  // songTemplate = Handlebars.compile(songSource);
  $songList.empty();
  renderSongs(songs);
}

function handleSongsError(json){
  console.log(json);
}


function handleUpdateAlbumSuccess(album){
  console.log(album);
  $('div').find("[data-album-id='" + album._id + "']").remove();
  renderAlbum(album);
}

function handleUpdateAlbumError(err){
  console.log(err);
}

function handleDeleteAlbumSuccess(album){
  console.log(album);
  console.log(album._id);
  $('div').find("[data-album-id='" + album._id + "']").remove();
}

function handleDeleteAlbumError(json){
  // console.log(json);
}

function handleNewSongSubmit(e){
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/api/albums/' + $('#songModal').data('album-id') + '/songs',
    data: {
      name: $('#songName').val(),
      trackNumber: $('#trackNumber').val(),
      trackLength: $('#trackLength').val()
    },
    success: handleNewSongSuccess,
    error: handleNewSongError
  });
  $.get('/api/albums/' + $('#songModal').data('album-id')).success(singleAlbumRemoveAndRender);
}

function singleAlbumRemoveAndRender(album){
  // console.log(album);
  var id = album._id;
  $('div').find("[data-album-id='" + id + "']").remove();
  renderAlbum(album);
}

function handleNewSongSuccess(json){
  console.log(json);
}

function handleNewSongError(json){
  console.log("Error in create new song",json);
}

function albumSuccess(json){
  $albumList.empty();
  // console.log(json);
  allAlbums = json;
  allAlbums.forEach(function(album){
    renderAlbum(album);
  });
}

function albumError(json){
  // console.log("err on album get",json);
}

function addAlbumSuccess(json){
  // console.log(json);
  allAlbums.push(json);
  renderAlbum(json);
}

function addAlbumError(json){
  // console.log("err on album post",json);
}



// this function takes a single album and renders it to the page
function renderSongs(songs){
  // console.log(songs);
  var songHtml = songTemplate({songsList: songs});
  $songList.append(songHtml);
}


function renderAlbum(album) {
  // console.log(album);
  var albumHtml = albumTemplate(album);
  // console.log(albumHtml);
  $albumList.prepend(albumHtml);
}
