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
const getCatById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('select * from cats where id=$1', [id], (err, res) => {
     if (err) throw err;
      response.status(200).json(res.rows)
  })
}

//3. Lets add new cats into our database
const addCats = (request, response) => {
  const {catName, catAge} = request.body;
  pool.query('INSERT INTO cats (catName, catAge) VALUES ($1, $2)', [catName, catAge], (err, res) => {
      if (err) throw err;
       response.status(200).json(res.rows)
   });
}


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
    getCatById,
    addCats,
    updateCats,
    deleteCat
}




