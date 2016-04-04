# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60">  tunely lab

Full CRUD SPA with mongoose and Express.

<img src="http://i1.wp.com/www.sarahthegringa.com/wp-content/uploads/2016/03/chilca-mud-bath.jpg?zoom=2&resize=800%2C445" alt="jubilant woman in mud bath" width="300px">  
_**This** CRUD SPA is a data-driven single-page application!_

Prerequisites:
* jQuery, AJAX
  * `$('asdf').on('click', '.add-song', ...`
  * `$.get`
  * `$.post`
  * `$(document).ready(function() { ... `
* Express server, static assets
* RESTful design
* serving JSON with `/api/` routes
* Bootstrap (this lab will introduce modals!)
* CRUD with mongoose
  * mongoose embedded relationships
  * Part 3: mongoose references
* html `data-` attributes

Other tools
* bower is used but doesn't need to be modified
  * bower components are automatically installed via npm's `postinstall` script (curious? see `package.json`)


## Overview

This lab begins with a basic front-end to display a list of music albums.  As we progress through, we'll:
* serve the album data from our server's `/api/` routes  
* get the data from the server using ajax and display it on the page with jQuery  
* retrieve the data from the database  
* add functionality to create a new album  
* add functionality to remove/delete an album  
* add the ability to edit/update an album  
* support storing song information (with full CRUD) (mongoose embedded)  
* add a second major route for artist information  (mongoose reference)  


### Project Planning

When working on large projects, it's important to do a good amount of planning and whiteboarding before you start coding.  Diligent planning will save you from costly mistakes and help you to refine the user experience before you've spent hours on the project.  The planning techniques and habits you develop here will be essential throughout your career as a web developer.  Every successful company invests time in planning and design, and you should too! As a junior web developer, you'll be expected to carry out plans

We're going to use **"outside-in development"** practices.  This means that we'll start by designing our UI (the outside that will be visible to our users). Then we'll move "inside" by connecting our UI to a server serving hard-coded data.  Next, we'll retrieve that data from a database.

We will also be breaking our work into short **sprints** with specific design goals.  This is another very common practice in the web development industry. In each sprint, we'll try to work outside-in.  

Let's start with a basic wireframe.  

![simple layout of tunely homepage](docs/assets/images/tunely_wireframe-1.png)

Typically when you work on a project, you'll start with a basic idea and do your initial development on paper or whiteboard.  You can develop simple prototypes and "virtually" test your app with wireframes.  If good old fashioned paper or whiteboards aren't your thing, a number of software packages can will help you build wireframes. But remember: a wireframe should include simple diagrams of your site's layout and flow, not full mockups.

In the wireframe above, you can see we're building a site that displays a list of musical albums.  It also has a jumbotron to introduce users to the page.  This is only our starting point; you'll be responsible for evolving it as we work through the lab.


## Getting Started

* fork and clone this lab repo
* read this readme, then proceed to sprint 1


## Sprints

### Module A: Create and Read with Mongo and embedded model relationships.

#### Sprint 1

[Sprint 1: serve & display hard-coded data on the page, then connect to a database](/docs/sprint1.md)

#### Sprint 2

[Sprint 2: add a form and support creation of new data](/docs/sprint2.md)

#### Sprint 3

[Sprint 3: add mongo embedded song data](/docs/sprint3.md)


### Module B: Update and Delete with Mongo and embedded model relationships.

#### Sprint 4

[Sprint 4: delete albums](/docs/sprint4.md)

#### Sprint 5

[Sprint 5: edit and update album info](/docs/sprint5.md)

#### Sprint 6

[Sprint 6: update song info & delete songs](/docs/sprint6.md)


### Module C: Full CRUD with Mongo and reference relationships.
