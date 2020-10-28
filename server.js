//make base setup for server


//setup libraries
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const PORT = process.env.PORT || 3002; //set new port (cli) export PORT= <new port value>
const PORT = 3002;
const db = require('./database.js');
const handlers = require('./handlers.js');

//set up application
const app = express();


//we will parse data as JSON
app.use(bodyParser.json());

//let set ejs as the view enjine
app.set('view engine', 'ejs');

//for POST requests we will use urlencoded like: applicaton/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here I implement login logic
//get users login form
app.get('/login', (req, res) => {
  res.render('loginForm');
});


app.post('/login', (req, res) => {
  db.getUserByEmail(req).then(result => {
    console.log(result[0].case)
    if (!result[0].case) {
      res.status(403).send("User doesn't exist!");
      }
    else {
        db.getUserByPassword(req).then(result => {
            if(result) {res.redirect('/myCocktails')}
            else {res.status(403).send('Wrong password!');}
        })
    }
  })
})

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here I implement register form logic

//lets set register route it is get request 
app.get('/register', (req, res) => {
  res.render('registerForm');
})


//lets add new user into db
app.post('/register', (req, res) => {
  db.getUserByEmail(req).then(result => {
    if (result[0].case) {
      res.status(403).send("User already exist! <a href='/login'>Login</a>");
      }
    else {
      db.addNewUser(req).then(result => {
        res.redirect('/myCocktails');
      })
    }
  })
})







//----------+----------------+----------+----------------+----------+----------------+----------+----------------
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
app.post('/cocktails', db.addCocktail);


//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will get specific user list of cocktails
//app.get('/cocktails/user/:id', db.getCocktailsByUserId);

app.get('/cocktails/user/:id', (req, res) => {
    db.getCocktailsByUserId(req).then(result => {
        const templateVars = {cocktails: result};
        res.render('myCocktails', templateVars);
    })
})


//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will delete cat from database
app.delete('/cocktails/:id', db.deleteCocktail);




//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will get a single user data (for instance particular user)
app.get('/cocktails/:id', db.getCocktailsById);




//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will get response from database to '/cats'
//app.get('/cocktails', db.getCocktails);

app.get('/cocktails', (req, res) => {
   db.getCocktails().then(result => {
       //console.log(cocktails);
       const templateVars = {cocktails: result};
       res.render('cocktails', templateVars);
   })
})




//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//try to do plain response - request
app.get('/', (req, res) => {
    //res.json({message: 'Node.js, Express and Postgres inside one boat EEEeeeehaaaaAAAA'});
    res.redirect('/cocktails');
});









//set port and start listen requests 
app.listen(PORT, () => {
    console.log(`Server is listeninig ${PORT}........../`)
});