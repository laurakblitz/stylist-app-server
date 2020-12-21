require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();

// const controllers = require('./controllers');

const user = require('./controllers/usercontroller');

app.use(require('./middleware/headers'));

const validateSession = require('./middleware/ValidateSession');

app.use(express.json());

app.use('/user', user);

db.authenticate()
    .then(() => db.sync()) // => {force: true}
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
    })
    .catch((err) => {
        console.log("[Server:] Server Crashed");
        console.error(err);
    });

// app.use('/test', function (req, res) {
//     res.send('This is a message from the test endpoint on the server!')
// })

// app.listen(3000, function () {
//     console.log('App is listening on port 3000');
// })