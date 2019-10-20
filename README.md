<h1 align="center"> POINT OF SALE API </h1>
Point of Sale API is an API that allows users to access cashier systems such as product items, product categories, and product quantities. The Point of Sale API also allows users to create, update and delete products and quantities to or from the database.

There are several features included in the API that allow users to search data by name, order or sorting by product name, category and date update, and reduce or add quantity

## Node JS
<img src="https://static.cdn-cdpl.com/source/23438/nodejs_logo_2016-image%28700x350-crop%29.png" width="400">

Node.js is software designed to develop web-based applications and is written in the syntax of the JavaScript programming language. If all this time we know JavaScript as a programming language that runs on the client / browser side only, then Node.js exists to complete the role of JavaScript so that it can also act as a programming language that runs on the server side, such as PHP, Ruby, Perl, and so on . Node.js can run on Windows, Mac OS X and Linux operating systems without the need for program code changes. Node.js has its own HTTP server library making it possible to run a web server without using a web server program such as Apache or Nginx

## Express JS
<img src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" width="400">

Express 3.x is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can use a variety of choices for your templating language (like EJS, Jade, and Dust.js).

You can then use a database like MongoDB with Mongoose (for modeling) to provide a backend for your Node.js application. Express.js basically helps you manage everything, from routes, to handling requests and views.

## REST API
<img src="https://miro.medium.com/max/1032/1*R99tA3ehTPO9BKvjYaTCuA.png" width="400">

REST (REpresentational State Transfer) is a web-based communication architecture standard that is often applied in the development of web-based services. Generally use HTTP (Hypertext Transfer Protocol) as a protocol for data communication. REST was first introduced by Roy Fielding in 2000.

On the REST architecture, the REST server provides resources (resources / data) and the REST client accesses and displays these resources for future use. Each resource is identified by URIs (Universal Resource Identifiers) or global IDs. These resources are represented in text format, JSON or XML. In general, the format uses JSON and XML.

## Built With
[![Express.js](https://img.shields.io/badge/express-4.17.1-yellow?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/npm-6.9.0-greenstyle?rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/mysql-2.17.1-blue?rounded-square)](https://www.npmjs.com/search?q=mysql) [![MySQL](https://img.shields.io/badge/body--parser-1.19.0-red?rounded-square)](https://www.npmjs.com/package/body-parser) [![Morgan](https://img.shields.io/badge/morgan-1.9.1-brightgreen?style=rounded-square)](https://www.npmjs.com/package/morgan) [![CORS](https://img.shields.io/badge/cors-2.8.5-lightgrey?style=rounded-square)](https://www.npmjs.com/package/cors) [![CORS](https://img.shields.io/badge/jsonwebtoken-8.5.1-yellowgreen?style=rounded-square)](https://www.npmjs.com/package/jsonwebtoken)

## Requirements
1. [Node JS](https://nodejs.org/en/download/)
2. [Express JS](https://expressjs.com/en/starter/installing.html)
3. [Postman](https://www.getpostman.com/)
4. Web Server (ex. localhost)

Before starting to clone repository, it's better to read and know **Node JS**, **REST API** and **Read the Documentation** about the requirements above

## Getting Started
-  Clone this repository
-   `npm install`  to install node.js in CMD / Terminal
-   `npm install express body-parser mysql` to install dependencies
-   `npm install dotenv` [![dotenv](https://img.shields.io/badge/dotenv-8.1.0-orange?style=rounded-square)](https://www.npmjs.com/package/dotenv)
-  If you don't understand about .env read [dotenv](https://www.npmjs.com/package/dotenv)
- Make a new file **.env**
- Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
- Setup the database.
- Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
- Choose HTTP Method and enter the request URL.(i.e. localhost:3030/product)
- Check all **Endpoints**

## Setup .env file
Open **.env** file on code editor and copy the code below :
```
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_DATABASE = 'ark_weekone'

PORT = 3000
SECRET_KEY = '270400'
```
## Setup Database
Create Database named  **ark-weekone**  :
```
CREATE DATABASE ark_weekone;
```
Create Table named **category** :
```
CREATE TABLE 'category' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Table named **product** :
```
CREATE TABLE 'product' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    quantity INT(55),
    image VARCHAR(255),
    price INT(55),
    category_id INT(55),
    date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Table named **stock** :
```
CREATE TABLE 'stock' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    product_id INT(55),
    quantityINT(55),
    time_addTIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Table named **transaction** :
```
CREATE TABLE 'transaction' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    order_group INT(55),
    product_id INT(55),
    quantityINT(55),
    time_addTIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Trigger **Stock**
```
CREATE  TRIGGER  product_order
BEFORE  INSERT ON  stock
BEGIN
	IF NOT EXISTS (SELECT * FROM product WHERE id = NEW.product_id) THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
    ELSE
    UPDATE product SET quantity = quantity + NEW.quantity WHERE id = NEW.product_id;
	END IF ;
END
```
Create Trigger **Transaction**
```
CREATE  TRIGGER  check_product_transaction
BEFORE  INSERT ON  transaction
BEGIN
	IF NOT EXISTS (SELECT * FROM product WHERE id = NEW.product_id) THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
    ELSEIF EXISTS (SELECT quantity FROM product WHERE id = NEW.product_id AND (quantity = 0 OR quantity - NEW.quantity < 0)) THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dont Below 0 Order';
    END IF;
END
```
```
CREATE  TRIGGER  succes_product_transactionn
AFTER INSERT ON  transaction
BEGIN
	BEGIN
	UPDATE product set quantity = quantity - NEW.quantity WHERE id = NEW.product_id;
END
END
```
### HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

-   `GET`  Get a resource or list of resources
-   `POST`  Create a resource
-   `PUT`  Update a resource
-   `DELETE`  Delete a resource

### HTTP Response Codes
| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `Succes`                 | The request was successful                                                          |
| `400` | `Error`        | There was a problem with the request    |



## Endpoints

#### **Homepage**

- **Request** : **`GET /`**
- **Response** :

```
    {
    "message": "Welcome to RESTfull API for Point of Sale",
    "author": "@Derida23",
    "documentation": "https://github.com/Derida23/PointOfSale-ExpressJS-API",
    "github": "github.com/Derida23"
    }
 ```

#### **Register**

- **Request** : **`POST /register`**
- **Response** :

  ```
    {
    "status": 200,
    "message": "The user is successfully registered!",
    "user": {
        "username": "admin",
        "password": "$2a$10$ThIm7Ra5opmjcrVq.vkN3.9J8m5wUCNPfyYBKgm3c9du2/OhY17Mu"
    }
  }
  ```

#### **Login**

- **Request** : **`POST /login`**
- **Response** :
```
{
    "status": 200,
    "message": "Login successfully!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbWVuZXNpYSIsImlhdCI6MTU2NjAwNDI2Nn0.Pu71LkGJn9wYM6n_xk5qadXoH4DfoE1jIQq01iN_7u8"
}
```
#### **CRUD Books Endpoint**
* **Read All Books**
  - **Request** : **`GET /books`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "title": "Wordl War II",
            "desc": "The history of world war II",
            "image_url": "cover world war II",
            "released_at": "2019-08-03T17:00:00.000Z",
            "genre": "History",
            "status": "Not Available"
        },
        {
            "title": "The Witcher",
            "desc": "The Witcher is an action role-playing game developed by CD Projekt Red and published by Atari, based on the novel series of The Witcher by Polish author Andrzej Sapkowski.",
            "image_url": "image the witcher",
            "released_at": "2019-08-02T17:00:00.000Z",
            "genre": "Novel",
            "status": "Available"
        },
        {
            "title": "Calculus",
            "desc": "Mathematics hell",
            "image_url": "image book math",
            "released_at": "2019-08-01T17:00:00.000Z",
            "genre": "Education",
            "status": "Not Available"
        }
    ]
}
```

### A. CRUD Category Endpoint
**1. Read All Category**
 -   **Request**  :  **`GET /category`**
 -   **Response**  :
```
{
	"status": 200,
	"data": [
		{
			"id": 1,
			"name": "Food",
			"date_add": "2019-10-14T14:09:26.000Z",
			"date_update": "2019-10-14T13:59:43.000Z"
		},
		{
			"id": 2,
			"name": "Drink",
			"date_add": "2019-10-14T14:30:40.000Z",
			"date_update": "2019-10-14T14:24:37.000Z"
		}
	]
}
```
**2. Read a category**
 -   **Request**  :  **`GET /category/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"data": [
		{
			"id": 1,
			"name": "Food",
			"date_add": "2019-10-14T14:09:26.000Z",
			"date_update": "2019-10-14T13:59:43.000Z"
		}
	]
}
```
**3. Create a category**
 -   **Request**  :  **`POST /category`**
 -   **Response**  :
```
{
    "status": 200,
    "message": "Category succes insert"
}
```
**4. Update a category** (Need Verification)

 -   **Request**  :  **`PUT /category`**
 -   **Response**  :
```
{
	"status": 200,
	"data": "Category succes updated"
}
```
**5. Delete a category**
 -   **Request**  :  **`DELETE /category/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"data": "Category succes delete"
}
```
### B. CRUD Product Endpoint
**1. Read all product**
 -   **Request**  :  **`GET /product/`**
 -   **Response**  :
```
{
	"status": 200,
	"data": [
		{
			"id": 1,
			"name": "Nasi Goreng",
			"description": "Nasi goreng adalah makanan khas nusantara",
			"quantity": 25,
			"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Nasi_goreng_Solaria_Kuta.JPG/220px-Nasi_goreng_Solaria_Kuta.JPG",
			"price": 15000,
			"category_name": "Food",
			"date_add": "2019-10-14T14:38:28.000Z",
			"date_update": "2019-10-17T08:29:37.000Z"
		},
		{
			"id": 4,
			"name": "Nasi Bakar",
			"description": "Nasi bakar adalah nasi yang dibakar nikmat",
			"quantity": 8,
			"image": "https://i.pinimg.com/originals/2b/6b/0d/2b6b0d27026282d0b984c6a4cae95d22.jpg",
			"price": 18000,
			"category_name": "Food",
			"date_add": "2019-10-15T03:05:59.000Z",
			"date_update": "2019-10-16T02:34:35.000Z"
		}
	]
}
```
**2. Read a product**
 -   **Request**  :  **`GET /product/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"data": [
		{
			"id": 1,
			"name": "Nasi Goreng",
			"description": "Nasi goreng adalah makanan khas nusantara",
			"quantity": 25,
			"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Nasi_goreng_Solaria_Kuta.JPG/220px-Nasi_goreng_Solaria_Kuta.JPG",
			"price": 15000,
			"category_name": "Food",
			"date_add": "2019-10-14T14:38:28.000Z",
			"date_update": "2019-10-17T08:29:37.000Z"
		}
	]
}
```
**3. Create a product**
 -   **Request**  :  **`POST /product`**
 -   **Response**  :
```
{
	"status": 200,
	"data": "Product success insert"
}
```
**4. Update product**
 -   **Request**  :  **`PUT /product`**
 -   **Response**  :
```
{
	"status": 200,
	"data": "Product success update"
}
```
**5. Delete product**
 -   **Request**  :  **`DELETE /product/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"data": "Product success delete"
}
```
###  C. Search, Pagination, Sort in Product

 - **Search by name** `` Request : GET /product/?search=nasi ``
 - **Pagination in product** `` Request : GET product/?page=1&content=4 ``
 - **Sort name** `` Request : GET product/?order=name&sort=DESC ``
 - **Sort category** `` Request : GET product/?order=category&sort=ASC``
 - **Sort date update** `` Request : GET product/?order=date_update&sort=DESC ``

### Add / Reduce Product Order Below 0
**1. Add product**
-   **Request**  :  **`POST order/add`**
-   **Response**  :
```
{
	"status": 200,
	"data": "Product success added"
}
```
**2. Reduce product**
-   **Request**  :  **`POST order/reduce`**
-   **Response**  :
```
{
	"status": 200,
	"data": "Product success reduced"
}
```
