const firebase = require("firebase/app");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
	apiKey: "AIzaSyCq4MHSFEV9IDzMpFKbaHpUDFV7XeZE9N0",
	authDomain: "kanban-c286f.firebaseapp.com",
	projectId: "kanban-c286f"
});

module.exports = firebase;
