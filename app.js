require('dotenv').config();

const express = require('express');
const db = require('./db');
const app = express();

app.use(require('./middleware/headers'));

app.use(express.json());

const controllers = require('./controllers');

const validateSession = require('./middleware/validateSession');

app.use('/user', controllers.usercontroller);

app.use('/closet', validateSession, controllers.closetcontroller);
app.use('/wishlist', validateSession, controllers.wishlistcontroller);

db.authenticate()
    .then(() => db.sync()) // => {force: true}
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
    })
    .catch((err) => {
        console.log("[Server:] Server Crashed");
        console.error(err);
    });