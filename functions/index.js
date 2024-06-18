const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { getStorage, ref, listAll, getDownloadURL } = require('firebase/storage');
const fetch = require('node-fetch');
const { storage } = require('../src/firebaseauth');


exports.dreamlookCallback = require('./dreamlookCallback').dreamlookCallback;
admin.initializeApp();


