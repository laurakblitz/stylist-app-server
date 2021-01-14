require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();

const controllers = require('./controllers');

app.use(express.json());

app.use(require('./middleware/headers'));

// app.use(express.json());

// const controllers = require('./controllers');

// const validateSession = require('./middleware/validateSession');

app.use('/user', controllers.usercontroller);
app.use('/closet', controllers.closetcontroller);
app.use('/wishlist', controllers.wishlistcontroller);

db.authenticate()
    .then(() => db.sync()) // => {force: true}
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
    })
    .catch((err) => {
        console.log("[Server:] Server Crashed");
        console.error(err);
    });