const Firebase = require('firebase-admin');

const serviceAccount = require('../men-drive-fedbf-firebase-adminsdk-fbsvc-4ec1bd9d69.json');

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'men-drive-fedbf.firebasestorage.app'
});

module.exports = firebase;