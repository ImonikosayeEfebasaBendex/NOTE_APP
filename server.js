const express = require('express');
const bodyparser = require('body-parser');
const port = 9000;

//create express App
const app = express();

//parse request of content - type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));

//parse request of content-type - application/json
app.use(bodyparser.json());

//define a simple route
app.get('/', (req, res)=> {
    res.json({'message': 'Welcome to my HOME PAGE!!!'});
});

//listen for requests
app.listen(port, () => {
    console.log(`server listening on port ${port}...`)
});

//configuring the database
const dbConfig = require('./config/databasa.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connect to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=> {
    console.log('successfully Connected to MongoDB database...');
}).catch(err => {
    console.log('error connecting to MongoDB database. Exiting now...', err);
    process.exit();
})

//.......

//require note routes
require('./app/routes/note.routes.js')(app);