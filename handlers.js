//here I will store handlers function 

//1. randomIdcreator function will create random user id. Function will create user id in range from 1 to 1000
let randomUserIdGen = () => {
    const minNumber = 1;
    const maxNumber = 3;
    let randomId = Math.random() * (maxNumber - minNumber) + minNumber;
    return Math.round(randomId);
    };

for (let i = 0; i <100; i++) 
    {console.log(randomUserIdGen())}
    



//here we will export modules
module.exports = {
    randomUserIdGen
}