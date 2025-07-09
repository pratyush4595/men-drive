const Firebase = require('firebase-admin');
const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const serviceAccount = require('../men-drive-fedbf-firebase-adminsdk-fbsvc-4ec1bd9d69.json');

const storage = firebaseStorage({
    credentials: Firebase.credential.cert(serviceAccount),
    bucketName: 'men-drive-fedbf.firebasestorage.app',
    unique: true
});

const upload = multer({
    storage: storage
})

module.exports.upload = upload;