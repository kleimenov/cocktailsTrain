//set up libraries which we will use
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//define our application
const app = express();

//define port
const PORT = 3030;

//let set ejs as the view enjine
app.set('view engine', 'ejs');

//let set up body-parser, this lib will convert request body from buffer into string 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//-------------------------------------+-define DBs---+---------

const cocktailsDB = {
  'catsSpring': {
    user_id: 'userOne',
    ingredients: {
      'catsMilk': 10,
      'vodka': 10,
    },
  }
};

//const allPlayerDB = {};
const users = {
    "userOne": {
      id: "userOne",
      email: "userOne@example.com",
      password: "6q88er90",
    },
    "userTwo": {
      id: "userTwo",
      email: "userTwo@example.com",
      password: "6q8uu666er90",
    },
    "userZero": {
      id: "userZero",
      email: "userZero@example.com",
      password: "11",
    }
  }


//----------------------------------------------+-------------------------
/*
here I will define and implement helpers functions
*/
//this function returns random letters and number collection, I will use it like random id
let randomStringGen = () => {
  let randomId = Math.random().toString(36).substring(2,8);
  return randomId;
  };
  
let checkUserEmail = (email) => {
  for (let userId in users) {
    if (users[userId].email === email) {
      return true;
    };
  };
  return false;
  };
 
const cocktailsForUser = (currentUser) => {
  const currentUserDB = {};
  for (let key in cocktailsDB) {
    if (cocktailsDB[key].user_id === currentUser) {
      currentUserDB[key] = {ingredients: cocktailsDB[key].ingredients};
    };
  }
  return currentUserDB;
  }
  
const userShortUrl = (shortUrl, id) => {
  return urlDatabase[shortUrl].userID === id ? true : false;
  }

//----------+ routes ------------------------------+----------------------
/*
here I will implement routes

*/
//get urls.json
app.get('/.json', (req, res) => {
  res.json(cocktailsDB);
  });


app.get('/', (req, res) => {
  res.redirect('/cocktails');
});


//lets try to delete some url
app.post('/cocktails/:cocktail/delete', (req, res) => {
  if (req.cookies['user_id']) {
    if (cocktailsDB[req.params.cocktail].user_id !== req.cookies['user_id']) {
      res.redirect('/login')
    } else {
    const cocktail = req.params.cocktail;
    //here we will use delete function to delete key-value pair from object
    delete cocktailsDB[cocktail];
    //redirect to urls
    res.redirect('/cocktails')
    }
  } else { 
    res.redirect('/login') 
  }
}) 



//get route to the new url
app.get('/cocktails/new', (req, res) => {
  if (req.cookies['user_id']) {
    const templateVars = {
      user: users[req.cookies['user_id']],
    };
    res.render('cocktailAddNew', templateVars);
  } else {
    res.redirect('/login')
  }
})

const chekcCoctailName = (name) => {
  return cocktailsDB[name] ? true: false;
}

const checkEmptyValues = (db) => {
  for (let element in db) {
    if (element === '' || element === 'undefined') {
      delete db[element];
    }
  }
  return db;
}

app.post('/cocktails', (req, res) => {
  if (chekcCoctailName(req.body.cocktail)) {
    res.send("Cocktail name is taken")
  } else {
  cocktailsDB[req.body.cocktail] = {};
  cocktailsDB[req.body.cocktail].user_id = req.cookies['user_id'];
  cocktailsDB[req.body.cocktail].ingredients = {};
  cocktailsDB[req.body.cocktail].ingredients[req.body.ingredient1] =  req.body.Volume1;
  cocktailsDB[req.body.cocktail].ingredients[req.body.ingredient2] =  req.body.Volume2;
  cocktailsDB[req.body.cocktail].ingredients[req.body.ingredient3] =  req.body.Volume3;
  cocktailsDB[req.body.cocktail].ingredients[req.body.ingredient4] =  req.body.Volume4;
  cocktailsDB[req.body.cocktail].ingredients[req.body.ingredient5] =  req.body.Volume5;
  checkEmptyValues(cocktailsDB[req.body.cocktail].ingredients)
  res.redirect('/cocktails');
  }
})

app.get('/cocktails', (req, res) => {
  const templateVars = {
    user: users[req.cookies['user_id']],
    cocktails: cocktailsDB,
  };
  res.render('cocktails', templateVars);
});


app.post('/myCocktails/:cocktail', (req, res) => {
  if (req.cookies['user_id']) {
    const modCocktail = req.params.cocktail;
    cocktailsDB[modCocktail].ingredients[req.body.ingredient1] = req.body.Volume1;
    cocktailsDB[modCocktail].ingredients[req.body.ingredient2] = req.body.Volume2;
    cocktailsDB[modCocktail].ingredients[req.body.ingredient3] = req.body.Volume3;
    cocktailsDB[modCocktail].ingredients[req.body.ingredient4] = req.body.Volume4;
    cocktailsDB[modCocktail].ingredients[req.body.ingredient5] = req.body.Volume5;
    console.log(cocktailsDB[modCocktail].ingredients)
    checkEmptyValues(cocktailsDB[modCocktail].ingredients)
    res.redirect('/myCocktails')
  } else { res.redirect('/login') };
})


app.get('/myCocktails/:cocktail', (req, res) => {
  console.log(req.params)
  const templateVars = {
    user: users[req.cookies['user_id']],
    name: req.params.cocktail,
    ingredients: cocktailsDB[req.params.cocktail].ingredients,
  };
  console.log(cocktailsDB[req.params.cocktail])
  res.render('cocktailShow', templateVars)
})

app.get('/myCocktails', (req, res) => {
  if (req.cookies['user_id']) {
    const templateVars = {
      user: users[req.cookies['user_id']],
      cocktails: cocktailsForUser(req.cookies['user_id']),
    };
    res.render('myCocktails', templateVars);
  } else { res.redirect('register'); }
});



//add new player into user list
app.get('/cocktailsList', (req, res) => {
  if (req.cookies['user_id']) {
    const templateVars = {
      urls: urlForUser(req.cookies['user_id']),
      user: users[req.cookies['user_id']],
    };
    res.render('cocktails', templateVars);
  } else { res.redirect('register'); }
});



//-------------- regestration/login/logout -------------------------------


//get users registration form
app.get('/register', (req, res) => {
  const templateVars = {
    user: users[req.cookies['user_id']],
  };
  res.render('registerForm', templateVars);
});
  
//get submite of the register form
app.post('/register', (req, res) => {
  //get user information and store it into newUser variable
  const {name, email, password} = req.body;
  const emailEvaluation = checkUserEmail(email);
  //check conditions
  if (email === '' || password === '') {
    res.status(404).send("All the fields are required");
  }
  else if (emailEvaluation) {
    res.status(400).send("This user already exist!");
  }
  else {
    //create new user 
    const newUserKey = randomStringGen();
    //add the user into db
    users[newUserKey] = {};
    users[newUserKey].id = newUserKey;
    users[newUserKey].name = name;
    users[newUserKey].email = email;
    users[newUserKey].password = bcrypt.hashSync(password, saltRounds)
    
    //get the user cookies
    res.cookie('user_id', newUserKey);
    //redirect the GET
    res.redirect('/myCocktails');
  } 
});
  
//get users login form
app.get('/login', (req, res) => {
  const templateVars = {
    user: users[req.cookies['user_id']],
  };
  res.render('loginForm', templateVars);
});

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  let user = false;
  for (let key in users) {
    if (users[key].email === email && bcrypt.compareSync(password, users[key].password)) { 
      user = true;
      res.cookie('user_id', key);
      res.redirect('/myCocktails');
    }
    if (users[key].email === email && !bcrypt.compareSync(password, users[key].password)) {
      user = true;
      res.status(403).send('Wrong password!');
    }
  }
  if (!user) {
    res.status(403).send("User doesn't exist!");
  }
});
  
app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/');
});








//-------------------------------------+-----------------------+---------
//start listening PORT
app.listen(PORT, () => {
  console.log(`(Server on AIR) server is listening on port ${PORT}........../`)
})

