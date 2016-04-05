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
});

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
