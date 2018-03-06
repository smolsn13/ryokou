# venturesome
venturesome is a travel planning app that allows users to create Trip boards to organize lists of places they'd like to
visit and activities that look interesting. They can choose from a variety of cities to visit, and with the help of the
Yelp Fusion API, perform searches based on categories of interest. Users can save links to businesses and change the
category of the links.

Please visit the site [here](https://venturesome.herokuapp.com/).

## Planning
Here are some wireframes I created during the planning process.

![alt text](/public/img/homepage.png "Home")

![alt text](/public/img/signup.png "Signup")

![alt text](/public/img/login.png "Login")

![alt text](/public/img/addtrip.png "Add a trip")

![alt text](/public/img/newtrip.png "New Trip")

![alt text](/public/img/trips.png "Trips")

![alt text](/public/img/trip.png "Trip")

![alt text](/public/img/tripexample.png "Trip Example")

## User Stories
User 1: Frank is a college student looking for a summer getaway. He needs a quick, online way to organize his
trip plans so he knows where to eat in New York with his limited budget. He also wants to know which bars are popular with college students.

User 2: Sally is a working mom who has a limited amount of time to plan her family vacation. She wants to use Yelp to
look up food options ahead of time, but doesn't want to write down all the restaurant names and addresses she finds.

## API
I used the Yelp Fusion API to search businesses that users can save to their account. No actual data is stored from the
Yelp API, instead users save a publicly available url that links to a business Yelp page.
[Yelp Fusion API](https://www.yelp.com/fusion)

## Development
Day 1 was spent creating wireframes using Balsamiq Mockups and writing user stories to define why users would need
an app like Venturesome. I also started creating some basic ejs pages for the initial site content and started some basic searches using the Yelp Fusion API to see what kind of data was returned.

On Day 2, I created my database and data models using Sequelize and postgres, then started linking the models with
associations and linking pages together. I did run into some issues with the data models, in that I did not incorporate
the appropriate ID columns to link the models together. I was able to drop tables and redo the model creation and migrations without much trouble. I also started creating my get routes so users can begin to navigate between pages.

The next day I worked on my routes and starting linking pages together. I also added some basic styling with Materialize and began delving into the Materialize framework. I added some new button styles, links and colors.

On Days 4 and 5 I worked mostly on adding functionality to the Trips page, getting the search functions to display in select dropdown menus through Materialize. I added some jQuery logic to make dropdown menus appear depending on a previous dropdown selection, so users only see the relevant choice. I had difficulty getting businesses to appear on my trip page under specific categories, so this was my main goal going into the weekend.

The last two days were spent adding an edit and delete function to my businesses, so users can remove businesses they want to visit or change the assigned category in their account. The PUT and DELETE routes were difficult to get working, but some trial and error with jQuery and the routes paid off in the end. These were the most difficult part of the project, along with getting the lists of categories to display on the individual Trip page.

## Technologies Used
* HTML5, CSS3, Javascript, jQuery
* Node.js, Express, bcrypt, EJS
* Materialize CSS
* Sequelize, PostgreSQL

## Future Enhancements
Some features I would like to add:
* Search/input feature to allow users to choose their own city or their own categories to search, rather than selecting from a preset dropdown menu
* A delete function to remove entire Trips
* Additional styling to the Trip and Business results page
