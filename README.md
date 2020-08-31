# Finalyearproject
### DISCOVERUS - Tomas Brazas - G00349242
[logo]:client/src/assets/blackLogo.png

| Title | Info |
|-------|:------|
|Title | Discoverus|
Author | Tomas Brazas
Supervisor | Kevin OBrien
Video | [Demonstration](https://www.youtube.com/watch?v=fZG6A0KM2wg&feature=youtu.be)
Documentation | Can be found above in pdf format (DiscoverusDoc)

## About
Discoverus is a navigation web application that integrates google maps for main features such as location tracking, custom marker locations and 
directions. The users can also chat between each other in a realtime chat. The application is supposed to aid the user in saving their favourite locations across the globe. The application uses mongoDB atlas to host the database. A cluster with two collections, for the user and markers. Angular google maps is integrated to support navigational and marker features. The application showcases a MEAN stack developed application with multiple REST APIs that have been made to succesfully run the application.

## How To Run Locally
1. Open command terminal and type: `git clone https://github.com/tomasbrazas97/Finalyearproject`.
2. Open two command terminals (cmd prompt in start menu). Navigate both to the root directory of the cloned repo using the `cd` command.One one of them go into client using `cd client` from the root directory. etc `cd desktop/finalyearproject/client`. One will be a server, and the other is the client.
4. Type `npm install --save` to install the needed modules on both command terminals.
5. Upon succesfull install, in the client terminal type: `npm start` , in the server terminal type: `node server.js` to launch the server. If the user has nodemon, the user can type `nodemon server.js`. 
6. The application can be accessed by typing `http://localhost:4200/` into the address bar of your chosen web browser.

