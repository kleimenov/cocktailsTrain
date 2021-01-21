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
---
### Feature descriptions
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
### Descriptions of Frontend part 

---
### Descriptions of Backend part 

---
### Descriptions of data base architecture

---
### Descriptions of JavaScript features 




