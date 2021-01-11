//Let's try to learn and even implement AJAX (Asynchronous Javascript and XML) into my app

/* 
'Cocktail likes/dislikes counter' will be first feature where I impliment AJAX 
Algorithm:
- add likes counter (with JS in scrath)
- add AJAX on counter (it is afford add likes/dislikes and doesn't reload full page)
*/

//Let's go!!!!

//1) Let's create object XMLHttpRequest. Let's imagine it will be my container,
//which I will use for GET and POST requests.

const request = new XMLHttpRequest();

//2) set up path to file on server side, this file will execute requests
const url = "#"; //I will set path later


//3) set up type of connection (requests) in this case it will  be POST request (we want to use hidden way to send information)
request.open("POST", url, true);