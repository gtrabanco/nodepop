# Nodepop v. 1.0.0
## Introduction

This api is an exercise of the Keepcoding's Master Bootcamp II. The objective is to make a functional api to get info from a database that allow users to register and navigate throught the data.

Things you can do:

 - Register a new user.
 - Log In a current user to do the next actions.
 - Add mobile token to get push notifications.
 - Get announces in the database.
 - Filter announces in the database.
 - Add announces to the database

 Things you can NOT do:
 
 - Remove users.
 - Remove announces.
 - Get a list of users.

 
 ## Installation
 
 ### Getting the app server
 
 First you need a mongodb running in your system
 
 ```Bash
 $ git clone https://github.com/gtrabanco/nodepop
 $ npm install
 ```
 
 After this you should configure the app. Generating certificates, modifying all necessary things in them. But because it is an exercise I provide them all.
 
 
 ### Previous to running
 
 You can install default data with the user *sample1@example.com* and password *12345*. You only have to make yourself sure you are running mongodb and has the configuration in the *config/server.secret.js* right.
 
 Then you can install the default data with the command:
 ```Bash
 $ npm run installDB
 ```
 
 
 To run the server in development mode with nodemon (you have to be installed this first) at the default ports 3000 (http) y 4443 (https) you can use
 
 ```Bash
 $ npm run dev
 ```
 
 To run the server in production with ports 80 and 443 respectively for http and https you should run:
 
 ```Bash
 $ npm start
 ```
 
 ## Documentation
 
 Due to time issues the unique documentation generated is this file and not html with testing incorporate with iodocs or apidoc in /doc/ dir as I expected to.
 
 ## Api
 
 ### Generalities
 
 ### Translated messages in the response
 
 You can get the messages in english (default) or spanish setting the *accept-language* header to "es" or "en". You also get the same response with a get param *lang*.
 
 #### Api responses
 All success and error messages has the same data in the json returned object. Which is:
 
 ```Javascript
 {
 		code: String,
 		status: Int,
 		message: String,
 		data: {}
 }
 ```
 
 - *code* Is the string code as constant that describes the error and get the translated message.
 - *status* The http status code.
 - *message* String that describes the response.
 - *data* Object with more details in some errors with all texts in english. And with the returned data if success.

 #### Must known errors

 ##### Api *METHOD_ERROR* code
 
 If you receive this error is because you are requesting some (for example a login) with the bad http method.
 
 ##### Api *NOT_FOUND* code
 
 If you receive this error perhaps your request is erroneous.
 
 ##### 
 