const { request, response } = require('express');
const handlers = require('./handlers.js')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'deelooc21',
    host: 'localhost',
    database: 'cocktails_train',
    port: '5432'
})
//I will make a bunch of psql queries
//0. lets get user id
const getUserByEmail = (request, response) => {
  const email = request.body.email;
  return pool.query('select (case when exists (select email from users where email =$1) then 1 else 0 end)', [email]).then(res => res.rows);
};

//0.01 get user name by user id
const getUserNameByUserId = (id) => {
  return pool.query('SELECT name FROM users WHERE user_id =$1', [id]).then(res => res.rows);
};

//0.1 lets get user password
const getUserByPassword = (request, response) => {
  const email = request.body.email;
  const password =request.body.password;
  return pool.query('select password from users where email = $1', [email])
  .then(res => {
    if(res.rows[0].password===password) {
      return true;
    }
    return false;
  });
};


//1. Lets get all cocktails names from database
const getCocktails = () => {
  return pool.query('select * from cocktails').then(res => res.rows);
}

//2. Lets get specific cocktail data from database
const getCocktailsById = (request, response) => {
  //const id = parseInt(request.params.id);
  pool.query('select cocktails.cocktail_id, cocktail_name, ingredients, amount from cocktails inner join ingredients on cocktails.cocktail_id = ingredients.cocktail_id where ingredients.cocktail_id =$1', [id], (err, res) => {
     if (err) throw err;
      response.status(200).json(res.rows)
  });
}

//3. Lets delete cocktail from database
const deleteCocktail = (cocktailId) => {
  return pool.query('DELETE FROM user_cocktails WHERE cocktail_id = $1', [cocktailId]).then(res => res.rows);
}

//4. lets add new cocktail into user_cocktails/cocktails and ingredients tables. I implement couple of queries 
/*
const addCocktail = (request, response) => {
  //const { user_id, cocktail_id } = request.body
  const { user_id, cocktail_id, cocktail_name, ingredients, amount } = request.body;
  pool.query('INSERT INTO user_cocktails (user_id, cocktail_id) VALUES ($1, $2)', [user_id, cocktail_id], (error, results) => {
    if (error) {
      throw error
    }
  //response.status(201).send(`New cocktail id added inside user_cocktails table!`)
  })
  pool.query('INSERT INTO cocktails (cocktail_id, cocktail_name) VALUES ($1, $2)', [cocktail_id, cocktail_name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New cocktail_id and cocktail_name added inside cocktails! table`)
  })
  pool.query('INSERT INTO ingredients (cocktail_id, ingredients, amount) VALUES ($1, $2, $3)', [cocktail_id, ingredients, amount], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New cocktail_id and cocktail_name added inside cocktails! table`)
  })
}
*/

//4.0 
const addNewCocktailUserIDCocktailID = (userId, randomCocktailId) => {
  return pool.query('INSERT INTO user_cocktails (user_id, cocktail_id) VALUES ($1, $2)', [userId, randomCocktailId]).then(res => res.rows);
}


//4.1 here I will add new cocktail data (user_id, cocktail_id)
//const addNewCocktailUserIDCocktailID = (userId, randomCocktailId) => {
  //pool.query('INSERT INTO user_cocktails (user_id, cocktail_id) VALUES ($1, $2)', [userId, randomCocktailId]).then(res => res.rows);
//}

//4.2 here I will add new cocktail data (user_id, cocktail_id)
const addNewCocktailNameAndCocktailId = (randomCocktailId, cocktailName) => {
  return pool.query('INSERT INTO cocktails (cocktail_id, cocktail_name) VALUES ($1, $2)', [randomCocktailId, cocktailName]).then(res => res.rows);
}

//4.3 here I will add new ingredients into db
const addNewCocktailIngredientsI = (randomCocktailId, ingredinets, amount) => {
  return pool.query('INSERT INTO ingredients (cocktail_id, ingredients, amount) VALUES ($1, $2, $3)', [randomCocktailId, ingredinets, amount]).then(res => res.rows);
}




//5. Lets get specific cocktail data by user id
const getCocktailsByUserId = (id) => {
  //const id = parseInt(request.params.id);
  //console.log(id)
  return pool.query('select cocktails.cocktail_id, cocktails.cocktail_name from cocktails inner join user_cocktails on cocktails.cocktail_id=user_cocktails.cocktail_id where user_id =$1', [id]).then(res => res.rows);
}

//6. lets add new user into table users table
const addNewUser = (request, response) => {
  const {name, email, password} = request.body;
  const userId = handlers.randomUserIdGen();
  return pool.query('INSERT INTO users (user_id, name, email, password) VALUES ($1, $2, $3, $4)', [userId,name, email, password]).then(res => res.rows);
}

//7. lets get user id by email

const getUseridByEmail = (email) => {
  return pool.query('select user_id from users where email=$1', [email]).then(res => res.rows);
}


//8. get cocktail ingredients by cocktial id
const getIngredientsByCocktailId = (cocktailId) => {
  return pool.query('select ingredients, amount from ingredients where cocktail_id =$1', [cocktailId]).then(res => res.rows);
}

//9. lets check if user exist or not
const checkExistUserOrNot = (cocktail_id) => {
  return pool.query('select user_id from user_cocktails where cocktail_id =$1', [cocktail_id]).then(res => res.rows);
}

//10. get cocktail name by cocktail id
const getCocktailName = (id) => {
  return pool.query('select cocktail_name from cocktails where cocktail_id =$1', [id]).then(res => res.rows);
}

//---------+-------------------+-----------------------------+-------------
/*
const addCocktail = (request, response) => {
  console.log(request.body);
  console.log('_____________')
  const { user_id, cocktail_id, cocktail_name, ingredients, amount } = request.body;
  pool.query(
    'INSERT INTO user_cocktails (user_id, cocktail_id) VALUES ($1, $2)', [user_id, cocktail_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(res.rows)
    });
  pool.query(
    'INSERT INTO cocktails (cocktail_id, cocktail_name) VALUES ($1, $2)', [cocktail_id, cocktail_name],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(res.rows)
    });
  pool.query(
    'INSERT INTO ingredients (cocktail_id, ingredients, amount) VALUES ($1, $2, $3)', [cocktail_id, ingredients, amount],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(res.rows)
  });

}
*/


//-----+----------------------------+---------------------+----------+----
//4. Lets update cat data that already exist 
/*
const updateCats = (request, response) => {
    const id = parseInt(request.params.id);
    const {catName, catAge} = request.body;
    pool.query('UPDATE cats SET catName =$1, email =$2 WHERE id =$3',
      [catName, catAge, id], (err, res) => { if (err) throw err; response.status(200).send(`cat modified with ID: ${id}`)});
  }
*/



//here we will export modules
module.exports = {
  getCocktails,
  getCocktailsById,
  deleteCocktail,
  //addCocktail,
  getCocktailsByUserId,
  getUserByEmail,
  getUserByPassword,
  addNewUser,
  getUseridByEmail, 
  getUserNameByUserId,
  getIngredientsByCocktailId,
  checkExistUserOrNot,
  getCocktailName,
  addNewCocktailUserIDCocktailID,
  addNewCocktailNameAndCocktailId,
  addNewCocktailIngredientsI
}




