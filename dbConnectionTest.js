//make base setup for server


//setup libraries
const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3002;
const db = require('./database.js')

const app = express();


//we will parse data as JSON
app.use(bodyParser.json());

//for POST requests we will use urlencoded like: applicaton/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//try to do plain response - request
app.get('/', (req, res) => {
    res.json({message: 'Node.js, Express and Postgres inside one boat EEEeeeehaaaaAAAA'});
});


//here we will get a single user data (for instance particular user)
app.get('/cocktails/:id', db.getCocktailsById);

//here we will get response from database to '/cats'
app.get('/cocktails', db.getCocktails);

//here we will delete cat from database
app.delete('/cocktails/:id', db.deleteCocktail);



//here we will add new data to db
app.post('/cats/', db.addCats);

//here we will update specific cat data
app.put('/cats/:id', db.updateCats);




//set port and start listen requests 
app.listen(PORT, () => {
    console.log(`Server is listeninig ${PORT}........../`)
});