//here I will store handlers function 

//1. randomIdcreator function will create random user id. Function will create user id in range from 1 to 1000
const randomUserIdGen = () => {
  const minNumber = 11;
  const maxNumber = 1000;
  let randomId = Math.random() * (maxNumber - minNumber) + minNumber;
  return Math.round(randomId);
};

const randomCocktailId = () => {
  const minNumber = 20;
  const maxNumber = 10000;
  let randomId = Math.random() * (maxNumber - minNumber) + minNumber;
  return Math.round(randomId);
}

const randomReviewId = () => {
  const minNumber = 20;
  const maxNumber = 1000000;
  let randomId = Math.random() * (maxNumber - minNumber) + minNumber;
  return Math.round(randomId);
}

//here we will export modules
module.exports = {
    randomUserIdGen,
    randomCocktailId,
    randomReviewId
}