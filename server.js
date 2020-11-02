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
  let userName;
  if (req.cookies['user_id']) {
    const id = req.cookies['user_id'] //get user data from browser (cookie)
    db.getUserNameByUserId(id).then(result => {
      userName = result;
    });
  }
  const templateVars = {
    user: userName
  };
  res.render('loginForm', templateVars);
});


app.post('/login', (req, res) => {
  db.getUserByEmail(req).then(result => {
    //console.log(result[0].case)
    if (!result[0].case) {
      res.status(403).send("User doesn't exist!");
      }
    else {
        db.getUserByPassword(req).then(result => {
            if(result) {
              db.getUseridByEmail(req.body.email).then(result2 => {
                //console.log(result2)
                //console.log(result2[0].user_id)
                //console.log(res.cookie('user_cookie'))
                res.cookie('user_id', result2[0].user_id);
                res.redirect('/myCocktails');
              })
            }
            else {res.status(403).send('Wrong password!');}
        })
    }
  })
})

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here I implement logout form logic
app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/');
});
app.post('/cocktail/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/');
});

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here I implement register form logic

//lets set register route it is get request 
app.get('/register', (req, res) => {
  let userName;
  if (req.cookies['user_id']) {
    const id = req.cookies['user_id'] //get user data from browser (cookie)
    db.getUserNameByUserId(id).then(result => {
      userName = result;
    });
  }
    const templateVars = {
      user: userName,};
  res.render('registerForm', templateVars);
})


//lets add new user into db
app.post('/register', (req, res) => {
  db.getUserByEmail(req).then(result => {
    if (result[0].case) {
      res.status(403).send("User already exist! <a href='/login'>Login</a>");
      }
    else {
      db.addNewUser(req).then(() => {
        db.getUseridByEmail(req.body.email).then(result2 => {
          //console.log(result2)
          //console.log(result2[0].user_id)
          //console.log(res.cookie('user_cookie'))
          res.cookie('user_id', result2[0].user_id);
          res.redirect('/myCocktails');
        })
      })
    }
  })
})

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here I implement myCocktail page logic 
app.get('/myCocktails', (req, res) => {
  let userName;
  const id = req.cookies['user_id']; //get user id
  db.getUserNameByUserId(id).then(result => {
    userName = result[0].name; //get user name
  });
  db.getCocktailsByUserId(id).then((result) =>{
    const templateVars = {
      userId: id,
      user: userName,
      cocktails: result
    }
    //console.log(templateVars.cocktails)
    res.render('myCocktails', templateVars)
  })
})



//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will delete cocktail from user cocktail list
app.post('/cocktail/:id/delete', (req, res) => {
  if (req.cookies['user_id']) {
    const id = parseInt(req.params.id);
    db.deleteCocktail(id).then(result => {
      result.redirect('/myCocktails');
    });
  };
}) 

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will add new cocktail from user cocktail list
app.get('/cocktail/new', (req, res) => {
  const id = req.cookies['user_id']; //get user id
  let userName;
  db.getUserNameByUserId(id).then(result => {
    userName = result[0].name; //get user name
  });
      const templateVars = {
        user: userName
      }
      res.render('addNewCocktail', templateVars);
})

app.post('/cocktails', (req, res) => {
  const id = req.cookies['user_id']; //get user id
  const randomCocktailId = handlers.randomCocktailId();

  
})

/*
app.get('/cocktail/new', (req, res) => {
  
  let id = req.cookies['user_id'];
  let userName;
  //const id = parseInt(req.params.id);
  
  db.getUserNameByUserId(id).then(result => {
    userName = result[0].name; //get user name
  });
  const templateVars = {
    user: userName
  }
  res.render('addNewCocktail', templateVars);
})
*/
//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will get specific cocktail page logic (here soemthing wrong!!!!!)
app.get('/cocktail/:id', (req, res)=> {
  let userName;
  let cocktail;
  let cocktailName;
  const cocktailId = parseInt(req.params.id)
  let id = req.cookies['user_id']; //get user id
  if (req.cookies['user_id']) {
    db.getUserNameByUserId(id).then(result => {
      userName = result[0].name; //get user name
    });
  }
  db.getIngredientsByCocktailId(cocktailId).then(result => {
    cocktail = result;
    db.getCocktailName(cocktailId).then(result => {
      cocktailName = result[0].cocktail_name;
      db.checkExistUserOrNot(cocktailId).then(result => {
        let isUsersCocktail = false;
        if (result[0].user_id == id) {
          isUsersCocktail = true;
        } 
        //userId = result[0].user_id;
        const templateVars = {
          isUsersCocktail: isUsersCocktail,
          user: userName,
          cocktailName: cocktailName,
          ingredients: cocktail,
          cocktailId: cocktailId
        }
        res.render('specificCocktail', templateVars)
      })
    })
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
//+
app.get('/cocktails/user/:id', (req, res) => {
  let userName;
  if (req.cookies['user_id']) {
    const id = req.cookies['user_id'] //get user data from browser (cookie)
    db.getUserNameByUserId(id).then(result => {
      userName = result[0].name;
    });
  }
  db.getCocktailsByUserId(req).then(result => {
        const templateVars = {
          user: userName,
          cocktails: result
        };
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
  let userName;
  if (req.cookies['user_id']) {
    const id = req.cookies['user_id'] //get user data from browser (cookie)
    db.getUserNameByUserId(id).then(result => {
      userName = result[0].name;
    });
  }
  //console.log(userName)
  db.getCocktails().then(result => {
       //console.log(cocktails);
       const templateVars = {
         user: userName,
         cocktails: result};
       res.render('cocktails', templateVars);
   })
})




//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//try to do plain response - request
app.get('/', (req, res) => {
  res.redirect('/cocktails')
});

//set port and start listen requests 
app.listen(PORT, () => {
    console.log(`Server is listeninig ${PORT}........../`)
});