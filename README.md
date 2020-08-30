# Finalyearproject
### DISCOVERUS - Tomas Brazas - G00349242
[logo]:client/src/assets/blackLogo.png

| Title | Info |
|-------|:------|
|Title | Discoverus|
Author | Tomas Brazas
Supervisor | Kevin OBrien
Video | [Demonstration](https://www.youtube.com/watch?v=dZjFuAWhAw4&feature=youtu.be)
Documentation | Can be found above in pdf format (DiscoverusDoc)

## About
Discoverus is a navigation web application that integrates google maps for main features such as location tracking, venues and 
directions. The application is supposed to aid tourists coming to local area of Galway and viewing local spots of interest.

## How To Run Locally
1. Open command terminal and type: `git clone https://github.com/tomasbrazas97/Finalyearproject`.
2. Open two command terminals (cmd prompt in start menu). Navigate both to the root directory of the cloned repo using the `cd` command.One one of them go into client using `cd client` from the root directory. etc `cd desktop/finalyearproject/client`. One will be a server, and the other is the client.
4. Type `npm install --save` to install the needed modules on both command terminals.
5. Upon succesfull install, in the client terminal type: `npm start` , in the server terminal type: `node server.js` to launch the server. If the user has nodemon, the user can type `nodemon server.js`. 
6. The application can be accessed by typing `http://localhost:4200/` into the address bar of your chosen web browser.

