const { request, response } = require('express');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'deelooc21',
    host: 'localhost',
    database: 'cocktails_train',
    port: '5432'
})
//I will make a bunch of psql queries

//1. Lets get all cocktails names from database
const getCocktails = (request, response) => {
   pool.query('select * from cocktails', (err, res) => {
       if (err) throw err;
       response.status(200).json(res.rows)
   })
}

//2. Lets get specific cat data from database
const getCocktailsById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('select cocktails.cocktail_id, cocktail_name, ingredients, amount from cocktails inner join ingredients on cocktails.cocktail_id = ingredients.cocktail_id where ingredients.cocktail_id =$1', [id], (err, res) => {
     if (err) throw err;
      response.status(200).json(res.rows)
  })
}

//3. Lets delete cocktail from database
const deleteCocktail = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM user_cocktails WHERE cocktail_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Cocktail deleted with ID: ${id}`)
  })
}


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
      [catName, catAge, id],
      (err, res) => {
          if (err) throw err;
           response.status(200).send(`cat modified with ID: ${id}`)
       });
  }
*/
  const updateCats = (request, response) => {
    const id = parseInt(request.params.id)
    const { catName, catAge } = request.body
  
    pool.query(
      'UPDATE cats SET catName = $1, catAge = $2 WHERE id = $3',
      [catName, catAge, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Cat modified with ID: ${id}`)
      }
    )
  }




//5. Lets delete cat from database
const deleteCat = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM cats WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Cat deleted with ID: ${id}`)
    })
  }

//here we will export modules
module.exports = {
    getCocktails,
    getCocktailsById,
    deleteCocktail,
    addCocktail,
    updateCats,
   
}




