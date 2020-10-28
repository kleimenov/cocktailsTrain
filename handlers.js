//here I will store handlers function 

//1. randomIdcreator function will create random user id
let randomUserIdGen = () => {
    const maxNumber = 1000;
    let randomId = Math.random() * maxNumber;
    return Math.round(randomId);
    };





//here we will export modules
module.exports = {
    randomUserIdGen
}