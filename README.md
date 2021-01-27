# cocktailsTrain
(non-commercial project)

* Author: [Ivan Kleimenov](https://github.com/kleimenov).

---
### Description
There is the `Full Stack web application` for cocktails fans.`RESTful API` is an architectural style for this application.
The interface of this application allows users to `GET, PUT, POST, and DELETE ` data when the user interacts with APP.

This is cocktails library web application. The main idea is to provide a communication platform for the cocktail lovers community, 
sort of a social network where the main discussion object is a cocktail. Users can share their favorite cocktails, left comments, and put likes.

`cocktailsTrain` website has couple of webpages:
- main (home) page;
- all cocktails page;
- my cocktails page;
- add new cocktail;
- edit existed cocktail;
- delete existed cocktail;
- reviews page.

All pages contain the website header (aka navigation block) with the links to other pages, login and logout buttons. 

1) _The main page_ is the landing page, where you can see a list of all cocktials that consist of all user's personal cocktails. 
Each cocktail has a personal block with a cocktail image (currently this feature under construction and you can see the same placeholder far all cocktails). 
User can click on the cocktail name and get access to the particular cocktail page. All users can see and interact with this page whether registered or not.

2) _The my cocktails page_ is a page that user use so as to hold his favorite cocktails or cocktails that the user wants to share with other users, 
also if the user clicks on each cocktail name on his page, he will be redirected to the specific cocktail page.

3) _Particular cocktail page_ is a page of the specific cocktail. On this page, users can get cocktail information like ingredients. Also on this page implemented three main features, edit cocktail ingredients, delete cocktail, and cocktail's reviews list. 

4) _Edit particular cocktail_ is a page where user can get access to a list of ingredients and add new or update existing ingredients.

5) _Particular cocktail reviews list_ is a page where users can read comments that leavs other users and add new comments. Also on this page implemented the likes feature (I will explain what is that feature further).

---
### Tech descripton and specification

This is Full Stack Web application with client and server side. Frontend part implemented with HTML(ejs)/CSS(SCSS)/JavaScript, backend architecture implemented on JavaScript and interaction with data base on SQL(PostgreSQL). All pages are responsive, work with a broad variety of screens in range from mobile devices (screen width 320px) to desktops (screen width 1200px and higher). This cross-devices web application affords users to feel comfortable interacting with content whether the size of the screen their device has.

This project is build with the following technologies:
```
- HTML;
- CSS;
- Bootstrap;
- SASS;
- Postgres SQL;
- JavaScript;
- Ajax;
- Node.js;
- Express.js
- Embedded JavaScript templating;
- PostgreSQL.

```

### Directory tree representation
```
cocktailsTrain
├── public
│   ├── assets
|   ├── fonts
|   |   ├── Begora.ttf
|   |   ├── fenwick.ttf
|   |   ├── Hustlersrough.otf
|   |   ├── NeonTubes2.otf
|   |   └── Yesteryear.ttf
|   ├── static
|   |   ├── addLikeDislike.js
|   |   ├── addNewCocktail.js
|   |   ├── addNewReview.js
|   |   ├── createIngredientField.js
|   |   └── index.js
|   ├── style
|   |   ├── style.css
|   |   ├── style.css.map
|   |   └── style.scss
├── views
|   └── partials
|   |   ├── _footer.ejs
|   |   ├── _header.ejs
|   ├── addNewCocktail.ejs
│   ├── cocktailReviews.ejs
|   ├── cocktails.ejs
|   ├── editSpecificCocktailData.ejs
|   ├── loginForm.ejs
|   ├── myCocktails.ejs
|   ├── registerForm.ejs
|   ├── specificCocktail.ejs
|   ├── startPage.ejs
├── clientSide.js
├── database.js
├── handlers.js
├── server.js
└── README.md
```

---
### Descriptions of Frontend part 
`cocktailsTrain` app provides users a handful of cool features:
- `login authentification`, get user email and password, search his in the database, compare current user data and check it with data in the database;
- `registration algorithm`, provide the users registration form, the algorithm checks user data and if everything correct, 
creates a new user account and user get access to all features that are not accessible for unregistered users;
- `access to all cocktails current list`, user can explore and interact all cocktails in database;
- `my cocktails list` is a crucial feature that allows sort cocktails and specific user to get access to their own list of cocktails. It allows users to manage their cocktails list, whether add new or edit exists cocktails, leave comments on other users cocktails;
- `add new cocktails`, this feature allows user create new cocktail, it is a core feature of application;
- `edit cocktail data`, allows user to edit all cocktail data like ingredients and amount of it;
- `delete cocktail` allows users to delete cocktails from a database for goods;
- `read, create and like reviews`, this three features provide users entertainment and communication with other users opportunity.

*Above I described application functionality in Layman's terms, further, I will show how it works under the hood.*

---
### Descriptions of Backend part
```
On server side I used fallow libraries and modules: 
- Express.js;
- body-parcer;
- cookie-parcer;
- bycript;
- path;
- pg;
- vanila JS;
- Ajax;
- postgeSQL.
```

`cocktailsTrain` application server implemented on express.js and includes follow routes:
```
- /;
- /cocktails;
- /login;
- /logout;
- /register;
- /myCocktails;
- /cocktail/:id;
- /cocktail/new;
- /cocktail/:id/edit;
- /cocktail/:id/delete;
- /cocktail/:id/reviews;
- /reviews/:reviewId/add.
```
---
### Descriptions of data base architecture

Database architecture imply fast cross-table access to data, it is necessary when the server becomes high loaded, a lot of users interact with the application. 
The database includes a bunch of tables with holds users, cocktails, ingredients, reviews data, and so on. Implemented cross table connection through foreign and primary keys. SQL queries manage the transition of data between tables and users.

---
### Descriptions of JavaScript features 
1) `Likes feature` (currently deployed just for reviews) for this feature was implemented a sophisticated algorithm that provides reliable control and prevents multiple likes. The solution implies keeping personalized likes data in a particular table `likes_list` and check the specific user has a record in this table or not. If the user has a record it means that he cannot add another one like, but he can put him like back if he clicks at like button a second time, in this case, it would work as a toggle. Such a solution works much reliable than prevent multiple likes problems on the client-side, like check the user's cookies, or add a specific condition that will disable the button, and so on.
2) `Add new cocktail` feature use `createIngredientField()` function to create specific HTML markup, build flex-container, add specific CSS selectors, and post data to the database.
3) `Edit cocktail` feature use `createIngredientField()` function to create specific HTML markup, build flex-container, add specific CSS selectors, and post data to the database.
4) The `Delete cocktail` feature uses a simple approach, get the cocktail id from the user, find it inside the database and execute a simple SQL query that deletes a particular record.
5) `Add a review` is an important feature that creates communication space between users. This feature implements a bunch of different SQL queries from database and sophisticated settings of async works of functions on the server-side.









