const { json } = require("body-parser");
const request = require("request");

const options = {
  method: 'GET',
  url: 'https://pokeapi.co/api/v2/pokemon/ditto',
  headers: {
    useQueryString: true
  }
};

request(options, (error, response, body) => {
    if (error) throw new Error(error);
    let data = JSON.parse(body)

	console.log(data.name);
});