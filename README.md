# Inventory Tracker
[![Run on Repl.it](https://repl.it/badge/github/GurkirtSingh/inventory-tracker-backend)](https://repl.it/github/GurkirtSingh/inventory-tracker-backend)
[![Frontend on Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GurkirtSingh/inventory-tracker-app)
This is node js/express backend server provides APIs to create, read, update and delete inventory items.

# Running Locally
## prerequisite
1. Node Js installed on the machine
2. MongoDB Connection string

## installation
Start by cloning this repostery to your machine.
```
git clone https://github.com/GurkirtSingh/inventory-tracker-backend.git
```
Now create a `.env` file in the main directory and add following environment variables.
```
NODE_ENV = "devlopment"
PORT = "3001"
MONGO_URI = your mongodb connection string
```
Before starting the server make sure to install all the dependencies.
```
npm install
```
And finally start the server by running
```
npm start
```
## Unit Testing
Now that the project is setup it's time run the tests. We are using `mocha chai chai-http` framework to write tests. You can find all the tests in `test` directory.
To run all the test at once hit the following command.
```
npm test
```
## How to use APIs
This web app provides basic CRUD opertaion on the inventory items in the form of APIs. There is a live version of it currently hosted on [Replit](https://replit.com/) at [Inventory Tracker Backend](https://replit.com/@GurkirtSingh/inventory-tracker-backend#.replit). Below is explanation on how the APIs work./

Every http request that perform operation on items needs to be sent at `url:port/item` and likewise for warehouse operations it needs to be at `url:port/warehouse`

## Contact
If you have any issues with the project you can open up an new issue or contact me at my at [Gurkirt Singh linkedin](linkedin.com/in/gurkirtsingh143)
