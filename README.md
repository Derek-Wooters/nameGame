# nameGame
Coworker name game


To run make sure to run npm install before hand since the node modules are not included.


Guess Who client:
This is a simple react single page application that has a handful of components.
The main component is the Board where the rendering and react logic occurs.  The api calls for
getGameBoard and selectCoworker are in the api.js file.

Guess Who Server:
The index.js file launches our server and is a basic express app.  I added the Cross-Origin-Scripting to
allow for api requests to be sent back and forth.  The routes for this are in the routes directory which mainly
points to the helper api’s for the put and get calls.  Inside helpers/game.js is where the logic is stored.
When a game is created a call is made to the provided WillowTree api and the data is returned.  Next, the getCoworkers
function takes in the requested number and the api data.  This function returns an object containing the user object that is passed
to the client side.  It filters out users that do not have a headshot or that are missing a first and last name.  If these items are missing, then it makes it hard for a guess who app.  From the returned array then a user object is picked at random to be the selected answer.
With the returned data placed in the game object, the game object is returned to the client. 

To check the game board we handle a put request call to updateGame.  This call goes through the current game board
and compares the sent over id with the id’s in the game board to mark it as selected.  It also compares the name against
the answer and if it is a match the correct value is set to true.  After the board has been updated it is returned to the new state to
the client.


Authentication was not handled in this application.  Ideally this would be done using json web tokens.  To do this I would want to store the games in a database with the user who created the game.  Validating against the user would allow for persisting statistics and make each game board user specific.
