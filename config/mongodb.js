const mongoose = require('mongoose');

// Connect to MongoDB server
module.exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then((res) => {
            console.log('MongoDB is connected');
        })
        .catch((err) => {
            console.log('Connection error', err);
        });
}