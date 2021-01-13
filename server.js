//setup libraries
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path')


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

//add json parcer
const jsonParser = express.json();

//absolute path of the directory
app.use(express.static(path.join(__dirname, 'public')))

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

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//lets add new user into db
app.post('/register', (req, res) => {
  db.getUserByEmail(req).then(result => {
    if (result[0].case) {
      res.status(403).send("User already exist! <a href='/login'>Login</a>");
      }
    else {
      db.addNewUser(req).then(() => {
        db.getUseridByEmail(req.body.email).then(result2 => {
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
      res.redirect('/myCocktails');
    });
  };
}) 

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will edit existed cocktail ingredients and name

app.get('/cocktail/:id/edit', (req, res) => {
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
        res.render('editSpecificCocktailData', templateVars);
      })
    })
  })
})

app.post('/myCocktails', (req, res) => {
  //const cocktailId = parseInt(req.params.id);
  const data = req.body;
  let id = req.cookies['user_id']; //get user id
  db.deleteCocktail(data.cocktailId).then(() => {
    db.addNewCocktailUserIDCocktailID(id, data.cocktailId).then(()=> {
      db.addNewCocktailNameAndCocktailId(data.cocktailId, data.cocktailName).then(()=>{
        for (let i in data.ingredient) {
          db.addNewCocktailIngredientsI(data.cocktailId, data.ingredient[i], data.amount[i])
        }
        res.redirect('/myCocktails');
      })
    })
  })
});

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//here we will add new cocktail from user cocktail list
app.get('/cocktail/new', (req, res) => {
  const id = req.cookies['user_id']; //get user id
  let userName;
  db.getUserNameByUserId(id).then(result => {
    userName = result[0].name; //get user name
    const templateVars = {
      user: userName
      }
      res.render('addNewCocktail', templateVars);
  });
})

app.post('/cocktails', (req, res) => {
  const id = req.cookies['user_id']; //get user id
  const randomCocktailId = handlers.randomCocktailId();
  const data = req.body;

  db.addNewCocktailUserIDCocktailID(id, randomCocktailId).then(()=> {
    db.addNewCocktailNameAndCocktailId(randomCocktailId, data.cocktailName).then(()=>{
      for (let i in data.ingredient) {
        db.addNewCocktailIngredientsI(randomCocktailId, data.ingredient[i], data.amount[i])
      }
      res.redirect('/myCocktails');
    })
  })
})

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
//here we will get specific user list of cocktails
//app.get('/cocktails/user/:id', db.getCocktailsByUserId);

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
//here we will get response from database

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
    const templateVars = {
      user: userName,
      cocktails: result};
    res.render('cocktails', templateVars);
  })
})

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
//try to do plain response - request
app.get('/', (req, res) => {
  let userName;
  if (req.cookies['user_id']) {
    const id = req.cookies['user_id'] //get user data from browser (cookie)
    db.getUserNameByUserId(id).then(result => {
      userName = result[0].name;
    });
  }
  //console.log(userName)
  db.getCocktails().then(result => {
    const templateVars = {
      user: userName,
      cocktails: result};
      res.render('startPage', templateVars);
  })
});
/*
app.get('/', (req, res) => {
  res.redirect('/cocktails')
});
*/

//----------+----------------+----------+----------------+----------+----------------+----------+----------------
app.post('/cocktail/:id/reviews', (req, res) => {
  const userId = req.cookies['user_id']; //get user id
  const data = req.body.review; //get data from textarea
  const cocktailId = parseInt(req.params.id) //get cocktail id
  if (req.cookies['user_id']) {
    const userId = req.cookies['user_id'] //get user data from browser (cookie)
    db.getUserNameByUserId(userId).then(result => {
      userName = result[0].name;
    });
  }
  
  db.addNewReview(cocktailId, data, userId)
  .then(()=>{
    res.redirect(`/cocktail/${cocktailId}/reviews`);
  })
});

//reviews page route
app.get('/cocktail/:id/reviews', (req, res) => {
  let userName;
  let cocktailName;
  const cocktailId = parseInt(req.params.id)

  if (req.cookies['user_id']) {
    const userId = req.cookies['user_id'] //get user data from browser (cookie)
    db.getUserNameByUserId(userId).then(result => {
      userName = result[0].name;
    });
  }
  db.getCocktailName(cocktailId).then(result => {
    cocktailName = result[0].cocktail_name;
    db.getReviewByCocktailIdUserId(cocktailId).then(result => {
      const templateVars = {
        cocktail_id: cocktailId,
        user: userName,
        reviews: result,
        cocktailName: cocktailName
      }
        res.render('cocktailReviews', templateVars);
    })
  });
});
//----------+----------------+----------+----------------+----------+----------------+----------+----------------


app.post('/reviews/:reviewId/add', jsonParser, (req, res) => { 

  let userName;
  let reviewId = req.body.reviewId;
  let amount = req.body.amount;
  let attitude = req.body.attitude;
  const userId = req.cookies['user_id']
  
  if (req.cookies['user_id']) {
    db.checkExistData().then(result => {
      let isTableEmpty = result[0].case;
      if (isTableEmpty) {
        db.ifLikesTableEmpty(userId, reviewId, attitude)
      }
      else {
        db.checkExistReview(userId, reviewId).then(result => {
          let isReviewExist = result[0].case;
          if (!isReviewExist) {
           db.ifLikesTableEmpty(userId, reviewId, attitude);
          } else {
            db.ifLikesTablNotEmpty(userId, reviewId, attitude);
          }
        })
      }
    });
    res.send('Done')
  }
});



//------------
//set port and start listen requests 
app.listen(PORT, () => {
  console.log(`Server is listeninig ${PORT}........../`)
});