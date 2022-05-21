# Inventory Tracker
[![Run on Repl.it](https://repl.it/badge/github/GurkirtSingh/inventory-tracker-backend)](https://repl.it/github/GurkirtSingh/inventory-tracker-backend)

[Live App](https://inventory-tracker-app.gurkirtsingh.repl.co)

This is node js/express backend server provides APIs to create, read, update and delete inventory items. There is also a fronend [Inventory Tracker App](https://github.com/GurkirtSingh/inventory-tracker-app) created using react for this project.

# Running Locally
## prerequisite
1. [NodeJs](https://nodejs.org/en/) v14.15.0 or higher
2. [MongoDB](https://www.mongodb.com/) Connection string

## installation
Start by cloning repository
```
git clone https://github.com/GurkirtSingh/inventory-tracker-backend.git
```
Now create a `.env` file in the root directory and add following environment variables to it.
```
NODE_ENV = "development"
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

`GET /item` will return json response containing list of all the items or an empty array if there is no item.

JSON response example:
```
{
  items:[
    {
      name: example item,
      quantity: 99,
      catogory: example category,
      warehouse: `warehouseId`,
      description: An example item
      
    },
    {
      name: example item 02,
      quantity: 75,
      catogory: example category,
      warehouse: `warehouseId`,
      description: An example item 02
      
    },
  ]
}
```
`GET /item/:itemId/getone` will return a JSON object containing item or error.

JSON success response:
```
{
  success: {
    item:{
      name: success example,
      quantity: 1,
    }
  }
}
```
JSON error response:
```
{
  error:{
    message: Could not find item.
  }
}
```

The structure of returning `JSON` response followed in all the  success and error responses.

`POST /item` will expect body containing item object with required field. 

```
POST /item
body: {
  name: postexample,
  quantity: -46
}

//JSON response
{
  "errors": [
    {
      "location": "body",
      "msg": "quantity should be more than 0",
      "param": "quantity"
    }
  ]
}

//JSON response
{
  item:{
    _id: 6984hgda879d8fer
    name: postexample,
    quantity: 46
  }
}
```

`PATCH /item?_id='itemId'&name=patchexample&quantity=78` this request will edit the item by given item id.

`DELETE /item/:itemId` will delete an item from object.


## Contact
If you have any issues with the project you can open up an new issue or contact me at my at [Gurkirt Singh linkedin](linkedin.com/in/gurkirtsingh143)
