/* CLIENT-SIDE JS
*
* You may edit this file as you see fit.  Try to separate different components
* into functions and objects as needed.
*
*/

var albumTemplate;
var $albumList;
var allAlbums = [];

$(document).ready(function() {
  console.log('app.js loaded!');
  $albumList = $('#albums');
  var albumSource = $('#album-list').html();
  albumTemplate = Handlebars.compile(albumSource);

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
    console.log('/api/albums/' + id);
    console.log("name:",$(this).closest('.album').find('.albumUpdate').val(),
            "artist:",$(this).closest('.album').find('.artistUpdate').val(),
            "releasedDate:",$(this).closest('.album').find('.releaseDateUpdate').val());
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



});

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
  console.log(json);
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
  // console.log(json);
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
  console.log("err on album get",json);
}

function addAlbumSuccess(json){
  // console.log(json);
  allAlbums.push(json);
  renderAlbum(json);
}

function addAlbumError(json){
  console.log("err on album post",json);
}



// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log(album);
  var albumHtml = albumTemplate(album);
  // console.log(albumHtml);
  $albumList.prepend(albumHtml);
}
