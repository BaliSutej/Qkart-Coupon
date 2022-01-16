const dotenv = require('dotenv');
const path = require('path');
const app = require('./app.js');

// config dotenv to get .env file
dotenv.config({path: path.join(__dirname,'../.env')});

// Initialize port with PORT number specified in .env file
const port = process.env.PORT;

// Starts app server to listen on port
app.listen(port,() => {
    console.log("Port started on "+ port);
});


