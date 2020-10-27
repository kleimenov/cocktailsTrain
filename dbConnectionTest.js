//make base setup for server


//setup libraries
const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3002;
const db = require('./database.js')

const app = express();


//we will parse data as JSON
app.use(bodyParser.json());

//let set ejs as the view enjine
app.set('view engine', 'ejs');

//for POST requests we will use urlencoded like: applicaton/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//try to do plain response - request
app.get('/', (req, res) => {
    //res.json({message: 'Node.js, Express and Postgres inside one boat EEEeeeehaaaaAAAA'});
    res.redirect('/cocktails');
});


//here we will get a single user data (for instance particular user)
app.get('/cocktails/:id', db.getCocktailsById);

//here we will get response from database to '/cats'
//app.get('/cocktails', db.getCocktails);

app.get('/cocktails', (req, res) => {
   db.getCocktails().then(result => {
       //console.log(cocktails);
       const templateVars = {cocktails: result};
       res.render('cocktails', templateVars)
   })
})

//here we will delete cat from database
app.delete('/cocktails/:id', db.deleteCocktail);

//here we will get specific user list of cocktails
app.get('/cocktails/user/:id', db.getCocktailsByUserId);



//here we will add new data to db
/*
app.post('/cocktails/', (req, res) => {
    console.log('fired');
    db.addCocktail(req.body).then(console.log('done'))
    .catch((err) => {
        console.log(err);
    })
})
*/
app.post('/cocktails', db.addCocktail)




//set port and start listen requests 
app.listen(PORT, () => {
    console.log(`Server is listeninig ${PORT}........../`)
});