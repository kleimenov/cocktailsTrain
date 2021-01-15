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
};

//2. Lets get specific cocktail data from database
const getCocktailsById = (request, response) => {
  //const id = parseInt(request.params.id);
  pool.query('select cocktails.cocktail_id, cocktail_name, ingredients, amount from cocktails inner join ingredients on cocktails.cocktail_id = ingredients.cocktail_id where ingredients.cocktail_id =$1', [id], (err, res) => {
     if (err) throw err;
      response.status(200).json(res.rows)
  });
};

//3. Lets delete cocktail from database
const deleteCocktail = (cocktailId) => {
  return pool.query('DELETE FROM user_cocktails WHERE cocktail_id = $1', [cocktailId]).then(res => res.rows);
};

//4. lets add new cocktail into user_cocktails/cocktails and ingredients tables. I implement couple of queries 
const addNewCocktailUserIDCocktailID = (userId, randomCocktailId) => {
  return pool.query('INSERT INTO user_cocktails (user_id, cocktail_id) VALUES ($1, $2)', [userId, randomCocktailId]).then(res => res.rows);
};

//4.2 here I will add new cocktail data (user_id, cocktail_id)
const addNewCocktailNameAndCocktailId = (randomCocktailId, cocktailName) => {
  return pool.query('INSERT INTO cocktails (cocktail_id, cocktail_name) VALUES ($1, $2)', [randomCocktailId, cocktailName]).then(res => res.rows);
};

//4.3 here I will add new ingredients into db
const addNewCocktailIngredientsI = (randomCocktailId, ingredinets, amount) => {
  return pool.query('INSERT INTO ingredients (cocktail_id, ingredients, amount) VALUES ($1, $2, $3)', [randomCocktailId, ingredinets, amount]).then(res => res.rows);
};

//5. Lets get specific cocktail data by user id
const getCocktailsByUserId = (id) => {
  //const id = parseInt(request.params.id);
  //console.log(id)
  return pool.query('select cocktails.cocktail_id, cocktails.cocktail_name from cocktails inner join user_cocktails on cocktails.cocktail_id=user_cocktails.cocktail_id where user_id =$1', [id]).then(res => res.rows);
};

//6. lets add new user into table users table
const addNewUser = (request, response) => {
  const {name, email, password} = request.body;
  const userId = handlers.randomUserIdGen();
  return pool.query('INSERT INTO users (user_id, name, email, password) VALUES ($1, $2, $3, $4)', [userId,name, email, password]).then(res => res.rows);
};

//7. lets get user id by email
const getUseridByEmail = (email) => {
  return pool.query('select user_id from users where email=$1', [email]).then(res => res.rows);
};

//8. get cocktail ingredients by cocktial id
const getIngredientsByCocktailId = (cocktailId) => {
  return pool.query('select ingredients, amount from ingredients where cocktail_id =$1', [cocktailId]).then(res => res.rows);
};

//9. lets check if user exist or not
const checkExistUserOrNot = (cocktail_id) => {
  return pool.query('select user_id from user_cocktails where cocktail_id =$1', [cocktail_id]).then(res => res.rows);
};

//10. get cocktail name by cocktail id
const getCocktailName = (id) => {
  return pool.query('select cocktail_name from cocktails where cocktail_id =$1', [id]).then(res => res.rows);
};

//11.1 get cocktail review by cocktial id
const getReviewByCocktailId = (cocktailId) => {
  return pool.query('select reviews from reviews where cocktail_id =$1', [cocktailId]).then(res => res.rows);
};

//11.1 (full query) get user name and cocktail reviews by cocktail id and user id
const getReviewsByCocktailIdUserId = (cocktailId) => {
  //return pool.query('select users.name, user_cocktails.cocktail_id, reviews.reviews from users inner join user_cocktails on users.user_id=user_cocktails.user_id inner join reviews on user_cocktails.cocktail_id=reviews.cocktail_id where reviews.cocktail_id = $1', [cocktailId]).then(res => res.rows);
  return pool.query('select users.name, reviews.cocktail_id, reviews.reviews, reviews.likes, reviews.dislikes, reviews.review_id from reviews inner join users on users.user_id=reviews.user_id where reviews.cocktail_id = $1', [cocktailId]).then(res => res.rows);
};

//11 here I will add new review into db
/*
const addNewCocktailIngredientsI = (randomCocktailId, ingredinets, amount) => {
  return pool.query('INSERT INTO ingredients (cocktail_id, ingredients, amount) VALUES ($1, $2, $3)', [randomCocktailId, ingredinets, amount]).then(res => res.rows);
}
*/

//12 lets add new review inside reviews table
const addNewReview = (cocktailId, review, userId) => {
  const reviewId = handlers.randomReviewId();
  return pool.query('INSERT INTO reviews (cocktail_id, reviews, user_id, review_id, likes, dislikes) VALUES ($1, $2, $3, $4, 0, 0)',[cocktailId, review, userId, reviewId]).then(res => res.rows);
};

//13 add new like 
const addAttitude = (cocktailId, attitude, value) => {
  if (attitude) {
    return pool.query('UPDATE reviews SET likes = $1 WHERE review_id = $2', [value, cocktailId]).then(res => res.rows);
  } else {
    return pool.query('UPDATE reviews SET dislikes = $1 WHERE review_id = $2', [value, cocktailId]).then(res => res.rows);
  }
};

//14 add data inside likes_list table after user clikcked like or dislike button
//14.1 if there isn't any data inside likes_list table
const checkExistData = ()  => {
  return pool.query('select (case when (select count(*) from likes_list) = 0 then 1 else 0 end)').then(res => res.rows);
}
//14.2 check if review_id exist

const checkExistReview = (userId, reviewId) => {
  return pool.query('select (case when (select count(*) from likes_list where user_id = $1 and review_id = $2) = 1 then 1 else 0 end)',[userId, reviewId]).then(res => res.rows);
}
//14.3 check is likes in existed review
const checkExistLike = (userId, reviewId) => {
  return pool.query('select (case when (select sum(liked) from likes_list where user_id = $1 and review_id = $2) = 1 then 1 else 0 end)',[userId, reviewId]).then(res => res.rows);
}

const checkExistDislike = (userId, reviewId) => {
  return pool.query('select (case when (select sum(disliked) from likes_list where user_id = $1 and review_id = $2) = 1 then 1 else 0 end)',[userId, reviewId]).then(res => res.rows);
}


//14.4 if table empty
const ifLikesTableEmpty = (userId, reviewId, attitude)  => {
  if (attitude) {
    return pool.query('INSERT INTO likes_list (user_id, review_id, liked, disliked) VALUES ($1, $2, 1, 0)',[userId, reviewId]).then(res => res.rows);
  } else {
    return pool.query('INSERT INTO likes_list (user_id, review_id, liked, disliked) VALUES ($1, $2, 0, 1)',[userId, reviewId]).then(res => res.rows);
  }
}

//14.5  if table isn't empty
const ifLikesTablNotEmpty = (userId, reviewId, attitude)  => {
  if (attitude) {
    return pool.query('UPDATE likes_list SET liked = 1 WHERE user_id = $1 AND review_id = $2',[userId, reviewId]).then(res => res.rows);
  } else {
    return pool.query('UPDATE likes_list SET disliked = 1 WHERE user_id = $1 AND review_id = $2',[userId, reviewId]).then(res => res.rows);
  }
}

//15.1 (full query) get user name and cocktail reviews by cocktail id and user id
const getReviewsAndUserId = (reviewId) => {
  //return pool.query('select users.name, user_cocktails.cocktail_id, reviews.reviews from users inner join user_cocktails on users.user_id=user_cocktails.user_id inner join reviews on user_cocktails.cocktail_id=reviews.cocktail_id where reviews.cocktail_id = $1', [cocktailId]).then(res => res.rows);
  return pool.query('select user_id from likes_list where review_id = $1', [reviewId]).then(res => 
    res.rows);
};

//16.1 (full query) get user name and cocktail reviews by cocktail id and user id
const getReviewsId = (cocktailId) => {
  //return pool.query('select users.name, user_cocktails.cocktail_id, reviews.reviews from users inner join user_cocktails on users.user_id=user_cocktails.user_id inner join reviews on user_cocktails.cocktail_id=reviews.cocktail_id where reviews.cocktail_id = $1', [cocktailId]).then(res => res.rows);
  return pool.query('select review_id from reviews where cocktail_id = $1', [cocktailId]).then(res => 
    res.rows);
};

//16.2 
//'select users.name, reviews.cocktail_id, reviews.reviews, reviews.likes, reviews.dislikes, reviews.review_id from reviews inner join users on users.user_id=reviews.user_id where reviews.cocktail_id = $1', [cocktailId])




/*
//14.6 select likes or dislikes
const checkAttitude = (userId, reviewId, attitude)  => {
  if (attitude) {
    return pool.query('select (case when exists (select liked from likes_list where user_id =$1 and review_id = $2 and liked = 1) then 1 else 0 end)', [userId, reviewId]).then(res => res.rows);
  } else { 
    return pool.query('select (case when exists (select disliked from likes_list where user_id =$1 and review_id = $2 and liked = 1) then 1 else 0 end)', [userId, reviewId]).then(res => res.rows);
  }
};
*/

//17 magic!
/*
select users.name, reviews.cocktail_id, reviews.reviews, reviews.likes, reviews.dislikes, reviews.review_id, users.user_id, likes_list.user_id as who_show_attitude, likes_list.liked, likes_list.disliked from reviews inner join users on users.user_id=reviews.user_id left join likes_list on reviews.review_id=likes_list.review_id where reviews.cocktail_id =

const magicQuery = (cocktailId) => {
  return pool.query('select users.name, reviews.cocktail_id, reviews.reviews, reviews.likes, reviews.dislikes, reviews.review_id, users.user_id, likes_list.user_id as who_show_attitude, likes_list.liked, likes_list.disliked from reviews inner join users on users.user_id=reviews.user_id left join likes_list on reviews.review_id=likes_list.review_id where reviews.cocktail_id = $1', [cocktailId]).then(res => res.rows);
};
*/






//here we will export modules
module.exports = {
  getCocktails,
  getCocktailsById,
  deleteCocktail,
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
  addNewCocktailIngredientsI,
  getReviewByCocktailId,
  getReviewsByCocktailIdUserId, 
  addNewReview,
  addAttitude,
  checkExistData,
  ifLikesTableEmpty,
  ifLikesTablNotEmpty,
  checkExistReview,
  checkExistLike,
  checkExistDislike,
  getReviewsAndUserId,
  getReviewsId,
  

}




