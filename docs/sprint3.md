# Sprint 3

## Overview

This sprint we will:
* add an embedded Song model to our Album model
* change the UI to allow users to see songs in the embedded model


> Note: if you get stuck as we go through this, make use of the hints, your neighbors, and the solutions.

> You must complete all of the previous sprint before starting this sprint. (excludes stretch challenges)

In this step, we'll be changing our album schema to have an embedded schema that contains songs.

The data from the database will look a little like this:

```
{ genres: [ 'new wave', 'indie rock', 'synth pop' ],
    songs:
     [ { _id: 5665ff1678209c64e51b4e6a,
         trackNumber: 1,
         name: 'Swamped' },
       { _id: 5665ff1678209c64e51b4e64,
         trackNumber: 7,
         name: 'Tight Rope' } ],
    _id: 5665ff1678209c64e51b4e63,
    releaseDate: '2008, November 18',
    name: 'Comalies',
    artistName: 'Lacuna Coil',
    __v: 0 },
```

* note that `songs` has been added and is an array of other mongoose documents!


## Step 1: Create the new model

1. Create a `models/song.js` file.

1. Open the file and create a song schema with properties like:

  ```js
    name: String,
    trackNumber: Number
  ```

1. Use your schema to create a `Song` model.

1. Export the `Song` model, and require it in `models/index.js`.

1. Require `./song.js` in `./albums.js`.

1. Alter the `AlbumSchema` to have a songs array that uses the `Song.schema`.

## Step 2: Seeding

Let's add seeds.  Some basic data is [provided for you](/docs/code_samples/sprint3_song_seeds.js).
We're going to use this data for all albums for now, even though obviously not all albums actually have this same list of songs.

1. Copy the sample songs into `seed.js`.

1. Write a `forEach` loop that adds the sample songs to each sample album in the array in `seed.js`.  Compare your work to the code sample above.

1. Run `node seed.js`.

1. Fix any issues you encounter, until you can see that your seed file is also adding songs for each album.

## Step 3: display

Let's go back to `app.js` and our HTML.  If you check the output of your AJAX call, you should see that we're already retrieving songs with each album just because of the embedded structure we've set up on the back-end. Double-check this before you proceed.  

We'll change the client to add another `<li>` after the ones that are already being generated for each album.  We'll list our songs in there.
For now we're just going to make this super simple and output something like:

```html
<li class="list-group-item">
  <h4 class="inline-header">Songs:</h4>
  <span>	– (1) Swamped – (2) Heaven's a Lie – (3) Daylight Dancer – (4) Humane – (5) Self Deception – (6) Aeon – (7) Tight Rope – </span>
</li>
```


1. Modify the handlebars template in your HTML to include a portion that will fill in all the songs for the album. You won't need a new `<script>` tag since the song list will be a part of each album, and you shouldn't need to change the client-side code in `app.js` because it's already rendering the whole template.

1. Test to make sure this is working.

## Step 4: Create Songs

Now let's create the functionality to add new songs.  To do this, we're going to use a button and open a bootstrap modal.

The modal is already setup for you in `index.html`.  We will have to add a button to each album to trigger the modal.  Also, since the same modal will be used for creating a song for _any_ album, we'll have to track which album we're supposed to be adding a song too.  


We're going to track this by setting a `data` attribute called `album-id` on the modal itself.  We will set this attribute every time we display the modal.  


Let's pseudo-code this.

```
// this function will be called when someone clicks a button to create a new song
//   it has to determine what album (in the DB) the song will go to
function handleNewSongButtonClick() {
  // get the current album's id from the row the button is in
  // set the album-id data attribute on the modal (jquery)
  // display the modal
}
```


First, we need to make sure we have the album id so we can use it later.  We'll set a `data` attribute on each album row first so that each row has it's ID listed.

1. On the HTML for each album, add a new `data-album-id` attribute to the top `<div class='row album'>`.

1. Set the value of that attribute to `album._id`.

1. Refresh the page and inspect the HTML in the browser.  Make sure the attribute is set and different for each album.

1. Add a button inside the panel-footer.

  <detail><summary>button code</summary>
  ```js
  <div class='panel-footer'>
    <button class='btn btn-primary add-song'>Add Song</button>
  </div>
  ```
  </detail>

1. Use jQuery to bind an event handler to these buttons' click events.  Test it by having it `console.log` when there's a click.

1. In your click event handler, get the current album row's `data-album-id` attribute.  

  > Hint: you may want to read the jQuery documentation for `parents` and `data`

  ```js
  $('#albums').on('click', '.add-song', function(e) {
      console.log('asdfasdfasdf');
      var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
      console.log('id',id);
  });
  ```

  > The above code might be new to you.  We've added a second CSS selector in the 'on' arguments.
  > Because the .add-song component is not going to be on the page at document-ready, our event listener cannot bind to it at that time.
  > Instead, we'll bind to something above it like `body` or `#albums`.  We just need to choose something that's on the page when we add our event listener and that will contain the event targets we're interested in.
  >  We will be able to capture the click anywhere in `#albums`, and if it's on the `.add-song` handle it in our function.


1.  Set the data-attribute `album-id` on the `#songModal`.

  <detail><summary>Hint: setting `data-album-id`</summary>

  ```js
  $('#songModal').data('album-id', currentAlbumId);
  ```

  </detail>

1. You can open a bootstrap modal by selecting it in jQuery and calling the `.modal()` function.  After setting the `data-album-id attribute` in your function, open the modal.

  > Suggested reading: [See the bootstrap docs on modals](http://getbootstrap.com/javascript/#modals-usage)

## Step 5:

So we should now have a working modal that opens and closes, but it doesn't do anything else yet.
Let's add a function to grab the data the user puts in the modal and POST the data as a new song.

  ```pseudo
  // call this when the save song button on the modal is clicked
  function handleNewSongSubmit(e) {
    e.preventDefault();
    // get data from modal fields
    // get album id
    // POST to SERVER
    // clear form
    // close modal
    // update the correct album to show the new song
  }
  ```

1. Create the `handleNewSongSubmit` function with pseudocode comments and a `console.log`. Test that it triggers when you expect it to. We'll fill it in over the next few steps.

1. We'll need the `album-id` in order to build the correct URL for the AJAX POST.  Our URL will eventually be like `http://localhost:3000/api/albums/:album_id/songs` -- we want to make sure we're adding each song to the right album.  In the `handleNewSongSubmit` function, get the correct id from the modal.  Build the URL and save it as a variable.

1. Prepare the POST request with an `ajax` call.  For data, make sure you get the `.val` from the input fields.  Don't forget to call `handleNewSongSubmit` when the modal button is clicked.

  > Hint: The modal doesn't actually have a form. Use .val to get the data from the input fields and construct an object for your POST data.

## Step 6:

Now we need to add the POST route on the server.  We're going to be using `request.params` (URL parameters) this time since we need to add the song to a specific album.

1. Build the `app.post` callback method for `'/api/albums/:album_id/songs'`.  Get the id from the request, and find the correct album in the database.

1. Create the new song with the data from the request, and add it to the album.  

1. Save your changes to the database, and respond to the client with JSON.

> Hint: when adding songs to the database, make sure that the `Song` model has been exported in `models/index.js`.

## Step 7:

Display the newly created song on the page.

1. Re-render the altered album on the page.  If you only sent back the new song's JSON before, you may _need_ to add a `GET /api/albums/:id` route and use that to get the album's full data. Whether you need it right now or not, add a `GET /api/albums/:id` route to send back the full data for one album.

1. Make sure you remove the old copy of the album from the page.

1. Close the modal afterward.

## Challenges

1. Add the remaining GET and POST routes to **Create** and **Read**.

  ```
  GET /api/albums/:album_id/songs/:id
  GET /api/albums/:album_id/songs
  ```

1. Add `imageUrl` as a property on Albums.  Update everything to use it!

1. Add track length as a field for each album.  


## Conclusion

You should now have the following API routes:

```
GET /api/albums
POST /api/albums
GET /api/albums/:id
POST /api/albums/:id/songs
```

You should also have a working app!  Congratulations!

![](http://i.giphy.com/wue4QtxncWuE8.gif)
