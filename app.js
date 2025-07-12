const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./config/mongodb');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const indexRoutes = require('./routes/indexRoutes');

const app = express();

dotenv.config();
mongodb.connect();

app.set("view engine", 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', indexRoutes.router);
app.use('/user', userRoutes.router);

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception');
    console.log(err);
});

app.listen(4000, () => {
    console.log('Server is listening on 4000');
});