# Nodepop v. 1.0.0

You can test this api throught the url https://nodepop.gabi.com.es

**ADVERT** Take care of the https and http connection or it will return an error.

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
 
 You can install default data with the user `sample1@example.com` and password `12345`. You only have to make yourself sure you are running mongodb and has the configuration in the *"config/server.secret.js"* right.
 
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
 
 ## Code
 
 ### Introduction
 This is a node with expressjs and some npm modules project. This project is modified to make easier the task of developing.
 
 ### Folders
 
 The hierachy of the project folders and some files explained.
 
 - bin -> This folders has the binaries to exec the server and install the default Database to testing with 3 rows of announces, 1 user and 1 token.
 - config -> This folder has all configuration files and index.js to load all configuration as it was a module. In the index.js we load for example the private keys to add later to the https server. It process all necessary params to do any necessary stuff.
 - lib -> Own necessary modules to avoid repetitive code.
 - locales -> Translations strings
 - models -> Database models with mongoose. Each one are independent of the connection. They all require the connection to avoid add any not necessary connection to the database in spite this not has a lot of meaning with the pool connection I think is a good practice.
 - node_modules -> npm modules (not included in git repository, see #Installation).
 - public -> static files
 - routes -> This the folder of the controllers grouped by categories in folders that should be added using route.use to index.js. You should not add any route to app.js file
 - uploads -> Temporary upload dir. If we were running the server in production we must add a crontab to delete old possible undeleted files here.
 - views -> Views
 - app.js -> The engine of the application
 
 ## Api
 
 ### Generalities
 
 #### Translated messages in the response
 
 You can get the messages in english (default) or spanish setting the `accept-language` header to "es" or "en". You also get the same response with a get param `lang` with the value of language. If it can not find the language it will use english always as default.
 
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
 
 ### Possible petitions with they params
 
 #### Users
 
 + /users
 
 	+ **/register [POST]**
 	 	- **email** Should be a unique valid email address. It will be used to login later.
 	 	- **password** A string of password to login later. It will be saved encrypted.

		##### Right petition sample
		```
		Method: POST
		Url: https://localhost:4443/apiv1/users/register
		Headers:
		    - Accept-language = en
		Params:
			- email = sample2@example.com
			- password = 12345
		```
		
		##### Success message
		It will never return the passwords
		
 	 	```
 	 	{
			"status": 201,
		  	"message": "Created",
		  	"code": "CREATED",
		  	"data": {
		   		"user": {
		      		"_id": "56116692127b3494103815b1",
		      		"email": "sample2@example.com"
		    	}
		  	}
		}
		
 	 	```
 	 	
 	 	##### Bad petition sample
 	 	If we make a petition request with no params or one invalid the response will have as data the erroneous fields and the same code anyway.
 	 	
 	 	##### Error message for invalid params or erroneous
 	 	```
 	 	{
		  "status": 422,
		  "message": "Invalid param",
		  "code": "INVALID_PARAM",
		  "data": {
		    "email": {
		      "message": "The \"email\" is a required value."
		    },
		    "password": {
		      "message": "The \"password\" is a required value."
		    }
		  }
		}
		```
		
		##### Error message for duplicate email
		```
		{
		  "status": 422,
		  "message": "Invalid param",
		  "code": "INVALID_PARAM",
		  "data": {
		    "email": {
		      "message": "The email is already registered"
		    },
		    "password": {
		      "message": "The \"password\" is a required value."
		    }
		  }
		}
		```
-

 	+ **/login [POST]**
 	 	- **email** Should be a unique valid email address. It will be used to login later.
 	 	- **password** A string of password to login later. It will be saved encrypted.

		##### Right petition sample
		```
		Method: POST
		Url: https://localhost:4443/apiv1/users/login?lang=en
		Headers:
		Params:
			- email = sample2@example.com
			- password = 12345
		```
		
		##### Success message
		It will return the token for future petitions
		
 	 	```
 	 	{
		  "status": 200,
		  "message": "Login successful",
		  "code": "LOGIN_OK",
		  "data": {
		    "user": {
		      "_id": "56116692127b3494103815b1",
		      "email": "sample2@example.com",
		      "password": "12345",
		      "__v": 0,
		      "_tokens": []
		    },
		    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI1NjExNjY5MjEyN2IzNDk0MTAzODE1YjEiLCJlbWFpbCI6InNhbXBsZTJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1IiwiX192IjowLCJfdG9rZW5zIjpbXX0.3da3-qR0k9vrL_gJkgEtUBS9Hb9qClYHdleE4cH4slHxj5MNPcIwr3I-Y8TiEcTd"
		  }
		}
 	 	```
 	 	**ADVERT!** `_tokens` inside the `data.user` object is not in relationship with `data.token`. The `data.token` is a valid token for make restricted petitions and `data.user._tokens` is for push notifications.
 	 	
 	 	##### Bad petition sample
 	 	If we make a petition request with no params or one invalid the response will have as data the erroneous fields and the same code anyway.
 	 	
 	 	##### Error message for invalid params or erroneous
 	 	```
 	 	{
		  "status": 422,
		  "message": "Invalid param",
		  "code": "INVALID_PARAM",
		  "data": {
		    "email": {
		      "message": "The \"email\" is a required value."
		    },
		    "password": {
		      "message": "The \"password\" is a required value."
		    }
		  }
		}
		```
-
 	+ **/add_token [PUT]**
 	 	- **platform** Should be a valid platform (see **/token_platforms** after this).
 	 	- **pushtoken** A string of password to login later. It will be saved encrypted.

		##### Right petition sample
		```
		Method: PUT
		Url: https://localhost:4443/apiv1/users/add_token
		Headers:
		    - Accept-language = en
		    - x-access-token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI1NjExNjY5MjEyN2IzNDk0MTAzODE1YjEiLCJlbWFpbCI6InNhbXBsZTJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1IiwiX192IjowLCJfdG9rZW5zIjpbXX0.3da3-qR0k9vrL_gJkgEtUBS9Hb9qClYHdleE4cH4slHxj5MNPcIwr3I-Y8TiEcTd
		Params:
			- platform = ios
			- pushtoken = aaaaaaaaabbbcd
		```
		
		##### Success message
		
 	 	```
 	 	{
		  "status": 201,
		  "message": "Created",
		  "code": "CREATED",
		  "data": {
		    "user": {
		      "_id": "56116692127b3494103815b1",
		      "email": "sample2@example.com",
		      "__v": 2,
		      "_tokens": [
		        {
		          "_id": "5611752f5f2a6b2411c028e6",
		          "platform": "ios",
		          "token": "aaaaaaaaabbbcd"
		        }
		      ]
		    }
		  }
		}
 	 	```
 	 	
 	 	##### Bad petition sample
 	 	
 	 	##### Error message for invalid params, erroneous or duplicated
 	 	```
 	 	{
		  "status": 422,
		  "message": "Invalid param",
		  "code": "INVALID_PARAM",
		  "data": {
		    "token": "Already exists"
		  }
		}
		```
		
		##### Other error
		Other error could be **NOT_MODIFIED** with status error 304.
		
		
		+ **/token_platforms [ANY]**
 	 	- No params

		##### Right petition sample
		```
		Method: GET
		Url: https://localhost:4443/apiv1/users/token_platforms
		Headers:
		    - Accept-language = en
		    - x-access-token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI1NjExNjY5MjEyN2IzNDk0MTAzODE1YjEiLCJlbWFpbCI6InNhbXBsZTJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1IiwiX192IjowLCJfdG9rZW5zIjpbXX0.3da3-qR0k9vrL_gJkgEtUBS9Hb9qClYHdleE4cH4slHxj5MNPcIwr3I-Y8TiEcTd
		Params:
		```
		
		##### Success message
		
 	 	```
 	 	{
		  "status": 200,
		  "message": "Ok",
		  "code": "OK",
		  "data": {
		    "platforms": [
		      "ios",
		      "android"
		    ]
		  }
		}
 	 	```
 	 	
 	 	##### Bad petition sample
 	 	
 	 	The unique posible error with this is an `INTERNAL` or if you make a mistake with the url.

---

#### Announces
 
 + /announces
 
 	+ **/ [GET]**
 		
 		All params are optionals
 	 	- **id** If this param is setted it could return one row or `NOT_CONTENT` error `code`.
 	 	
 	 	Appreciate that if you provide `id` filter with correct or incorrect *id* all other params will be ignored.
 	 	
 	 	- **tags** A string of one tag that should be a possible value (see **/field_tags** later on).
 	 	- **type** `buy` or `sell`.
 	 	- **price** Accept ranges separated by "-" for example "10-50" (from 10 to 50 $). It also accepts only one "-50" which means the same as "50" that is from 0 to 50. You can also use "50-" which means from 50 to unlimited price or the amount of money that wants to pay (`type = buy`).

 	 		**ADVERT!** It convert all numbers to integer so it is not possible to look for decimal amounts of money.
 	 	
 	 	- **timestamp** You must provide a valid string of number as JS/Mongo date and the api will provide you more recently than that `timestamp` announces **(modified or added)**.
 	 	- **start** From which row start to return data (used for pagination, for example in combination with `limit`).
 	 	- **limit** Max number of rows, never more than 1000.
 	 	- **sort** To get a sorted results. You must provide the field and `+` or nothing before to get in ascending order (default option). You can provide `-` before to get the list in descending order. By default is ordered by `modified` date field.
 	 	- **includeTotal** By default is not included but with `true` string as value of this var you will get a total for sell (as `data.totalSell` object with the total amount of all sell articles) and buy (as `data.totalBuy` object with the total amount of all buy articles). Appreciate that if there are no result for buy or sell the total would not be included in spite of its `0`.
		##### Right petition sample
		```
		Method: GET
		Url: https://localhost:4443/apiv1/announces?includeTotal=true
		Headers:
		    - Accept-language = en
		    - x-access-token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI1NjExNjY5MjEyN2IzNDk0MTAzODE1YjEiLCJlbWFpbCI6InNhbXBsZTJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1IiwiX192IjowLCJfdG9rZW5zIjpbXX0.3da3-qR0k9vrL_gJkgEtUBS9Hb9qClYHdleE4cH4slHxj5MNPcIwr3I-Y8TiEcTd
		Params:
		```
		
		##### Success message
		
 	 	```
 	 	{
		  "status": 200,
		  "message": "Ok",
		  "code": "OK",
		  "data": [
		    {
		      "_id": "56104f445a948b3a05acc472",
		      "title": "iPhone 4s",
		      "type": "sell",
		      "price": 60,
		      "photo": "https://localhost:4443/images/products/iphone4s.jpg",
		      "__v": 0,
		      "modified": "2015-10-03T21:57:24.342Z",
		      "tags": [
		        "work",
		        "mobile"
		      ]
		    },
		    {
		      "_id": "56104f445a948b3a05acc473",
		      "title": "Ball",
		      "type": "sell",
		      "price": 8,
		      "photo": "https://localhost:4443/images/products/ball.jpg",
		      "__v": 0,
		      "modified": "2015-10-03T21:57:24.344Z",
		      "tags": [
		        "lifestyle"
		      ]
		    },
		    {
		      "_id": "56104f445a948b3a05acc474",
		      "title": "Ferrari Car",
		      "type": "buy",
		      "price": 600000,
		      "photo": "https://localhost:4443/images/products/ferrari.jpg",
		      "__v": 0,
		      "modified": "2015-10-03T21:57:24.345Z",
		      "tags": [
		        "motor"
		      ]
		    },
		    {
		      "totalSell": 68
		    },
		    {
		      "totalBuy": 600000
		    }
		  ]
		}
 	 	```
 	 	
 	 	##### Bad petition sample results
 	 	The error for this is `NOT_CONTENT` with status code `200`.

--

   + **/fields [ANY]**

 	 	- No params.

		##### Right petition sample
		```
		Method: GET
		Url: https://localhost:4443/apiv1/announces/fields
		Headers:
			- Accept-language = en
			- x-access-token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI1NjExNjY5MjEyN2IzNDk0MTAzODE1YjEiLCJlbWFpbCI6InNhbXBsZTJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1IiwiX192IjowLCJfdG9rZW5zIjpbXX0.3da3-qR0k9vrL_gJkgEtUBS9Hb9qClYHdleE4cH4slHxj5MNPcIwr3I-Y8TiEcTd
		Params:
		```
		
		##### Success message
		It will return the token for future petitions
		
 	 	```
 	 	{
		  "status": 200,
		  "message": "Ok",
		  "code": "OK",
		  "data": {
		    "fields": [
		      "title",
		      "type",
		      "price",
		      "photo",
		      "tags",
		      "modified",
		      "_id"
		    ]
		  }
		}
 	 	```
 	 	 	 	
 	 	##### Bad petition sample
 	 	If you do a bad petition for this maybe you are not logged in, a mistake in the url or internal error.
 	 	
 --
 
  	+ **/field_tags [ANY]**
  	
	- No params.

		##### Right petition sample
		```
		Method: GET
		Url: https://localhost:4443/apiv1/announces/field_tags
		Headers:
			- Accept-language = en
			- x-access-token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI1NjExNjY5MjEyN2IzNDk0MTAzODE1YjEiLCJlbWFpbCI6InNhbXBsZTJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1IiwiX192IjowLCJfdG9rZW5zIjpbXX0.3da3-qR0k9vrL_gJkgEtUBS9Hb9qClYHdleE4cH4slHxj5MNPcIwr3I-Y8TiEcTd
		Params:
		```
		
		##### Success message
		It will return the token for future petitions
		
 	 	```
 	 	{
		  "status": 200,
		  "message": "Ok",
		  "code": "OK",
		  "data": {
		    "enum": [
		      "work",
		      "lifestyle",
		      "motor",
		      "mobile"
		    ]
		  }
		}
 	 	```
 	 	 	 	
 	 	##### Bad petition sample
 	 	If you do a bad petition for this maybe you are not logged in, a mistake in the url or internal error.
 	 	
 --
 
 	+ **/add [POST]**
 		
 		All params are required. I tried to add the possibility to upload a file but I have failed. I do not why because I got it in a example (see [the example in github](https://github.com/gtrabanco/nodejs/tree/master/21_express_file_upload_with_multer)). So now the unique way to add an announce is adding it with an url. And if you do this you could see that return valid urls for images.
 		
 	 	- **title** A title for the announce.
 	 	- **tags** A string of tags separated by commas without spaces.
 	 	- **type** `buy` or `sell`.
 	 	- **price** The amount of money you want or offer for a product.
 	 	- **photo** You must provide a valid url string.

 	 	##### Right petition sample
		```
		Method: POST
		Url: https://localhost:4443/apiv1/announces/add
		Headers:
		    - Accept-language = en
		    - x-access-token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI1NjExNjY5MjEyN2IzNDk0MTAzODE1YjEiLCJlbWFpbCI6InNhbXBsZTJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1IiwiX192IjowLCJfdG9rZW5zIjpbXX0.3da3-qR0k9vrL_gJkgEtUBS9Hb9qClYHdleE4cH4slHxj5MNPcIwr3I-Y8TiEcTd
		Params:
			- title = New Eggs Announce
			- type = sell
			- tags = lifestyle,work
			- price = 202
			- photo = http://www.luismaram.com/wp-content/uploads/2011/12/a9af7aa2b6c95e63e720201b3361705f.jpg
		```
		
		##### Success message
		
 	 	```
 	 	{
		  "status": 201,
		  "message": "Created",
		  "code": "CREATED",
		  "data": {
		    "__v": 0,
		    "title": "Other announce of nothing",
		    "type": "sell",
		    "price": 99,
		    "photo": "http://www.luismaram.com/wp-content/uploads/2011/12/a9af7aa2b6c95e63e720201b3361705f.jpg",
		    "_id": "561199048cc6cdd8139f1222",
		    "modified": "2015-10-04T21:24:20.894Z",
		    "tags": [
		      "work",
		      "lifestyle"
		    ]
		  }
		}
 	 	```
 	 	
 	 	##### Bad petition sample results
 	 	Somthing can happen and return an `INTERNAL` error or the most typical will be `INVALID_PARAM`
