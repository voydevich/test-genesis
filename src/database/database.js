const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCelXJs0c-AhF1PIv-ltL8DWdDt8uhlLFM",
    authDomain: "test-genesis.firebaseapp.com",
    databaseURL: "https://test-genesis.firebaseio.com",
    projectId: "test-genesis",
    storageBucket: "test-genesis.appspot.com",
    messagingSenderId: "978645376817",
    appId: "1:978645376817:web:4971eea4cab98680b75a10"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const database = firebase.firestore();

module.exports = database;