const express = require('express');
const app = express();
const dbConnect = require('./database/dbConnect.js');
const PORT = 5000;
const auth = require('./routes/auth.js');
const library = require('./routes/library.js');

async function serverStart() {
    try {
        await dbConnect();
        console.log("Successfully Connected to Database.");

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use('/api/auth', auth);
        app.use('/api/library', library);

        app.listen(PORT, () => {
            console.log("Server established at port " + PORT);
        });
    } catch (err) {
        console.log(err);
    }
}

serverStart();