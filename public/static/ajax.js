//Let's try to learn and even implement AJAX (Asynchronous Javascript and XML) into my app

/* 
'Cocktail likes/dislikes counter' will be first feature where I impliment AJAX 
Algorithm:
- add likes counter (with JS in scratch)
- add AJAX on counter (it is afford add likes/dislikes and doesn't reload full page)
*/

//Let's go!!!! Here we consider algorithm in scratch POST request to the server


//1) Let's create object XMLHttpRequest. Let's imagine it will be my container,
//which I will use for GET and POST requests.
const request = new XMLHttpRequest();

//2) set up path to file on server side, this file will execute requests
const url = "#"; //I will set path later

//3) here we will set what we want to send on server
const params;

//4) set up type of connection (requests) in this case it will  be POST request (we want to use hidden way to send information)
request.open("POST", url, true);

//5) add event listener and 
request.addEventListener("readystatechange", () => {

    if(request.readyState === 4 && request.status === 200) {       
		console.log(request.responseText);
    }
});

//6) and last step, send request
request.send(params)
