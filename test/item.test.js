/**
 * Test file - contain tests for APIs on route /item
 */
process.env.NODE_ENV = "test";

const Item = require("../models/Item");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { assert } = require("chai");
const should = chai.should();

chai.use(chaiHttp);

describe("Items APIs", () => {
  beforeEach((done) => {
    Item.remove({}, (err) => {
      done();
    });
  });
  after((done) => {
    Item.remove({}, (err) => {
      done();
    });
  });

  // Test POST Route
  describe("/POST item", () => {
    it("it should post a new item", (done) => {
      const data = {
        name: "Lamp",
        quantity: 109,
        description: "A nice lamp",
        category: "Lighting",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.success.should.have.property("item");
          res.body.success.item.should.be.a("object");
          res.body.success.item.should.have.property("_id");
          done();
        });
    });
    it("it should post a new item with only name and quantity", (done) => {
      const data = {
        name: "Washing Machine",
        quantity: 37,
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.success.should.have.property("item");
          res.body.success.item.should.have.property("name", "Washing Machine");
          res.body.success.item.should.have.property("quantity", 37);
          done();
        });
    });
    it("it should not post new item without name", (done) => {
      const data = {
        name: "",
        quantity: 90,
        description: "A Null Item",
        Category: "Unknown",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.be.a("array");
          done();
        });
    });
    it("it should not post new item without quantity", (done) => {
      const data = {
        name: "Glade",
        description: "An air freshener",
        Category: "Home",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.be.a("array");
          done();
        });
    });
    it("it should not post new item without quantity as numeber", (done) => {
      const data = {
        name: "Glade",
        quantity: "Fifty",
        description: "An air freshener",
        Category: "Home",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.be.a("array");
          done();
        });
    });
    it("it should not post new item with quantity in negative", (done) => {
      const data = {
        name: "Glade",
        quantity: -670,
        description: "An air freshener",
        Category: "Home",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.be.a("array");
          done();
        });
    });
    it("it should not post new item with invalid warehouse id", (done) => {
      const data = {
        name: "Glade",
        quantity: 90,
        description: "An air freshener",
        warehouse: "678126hj98a7d",
        Category: "Home",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message");
          done();
        });
    });
  });

  // Test GET Route
  describe("/GET item", () => {
    it("it should get all the items", (done) => {
      chai
        .request(app)
        .get("/item")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.success.should.have.property("items");
          res.body.success.items.should.be.a("array");
          res.body.success.items.length.should.be.eql(0);
          done();
        });
    });
    it("it should get item by valid id", (done) => {
      const data = {
        name: "Test Item",
        quantity: 28,
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("success");
          const testId = res.body.success.item._id;
          chai
            .request(app)
            .get(`/item/${testId}/getone`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success");
              res.body.success.should.have.property("item");
              res.body.success.item.should.have.property("name", "Test Item");
              res.body.success.item.should.have.property("quantity", 28);
              done();
            });
        });
    });
  });

  // Test PATCH Route
  describe("/PATCH item", () => {
    it("It should change the name of item", (done) => {
      const data = {
        name: "Lamp",
        quantity: 109,
        description: "A nice lamp",
        category: "Lighting",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          const itemId = res.body.success.item._id;
          chai
            .request(app)
            .patch(`/item`)
            .query({
              _id: itemId,
              name: "Bulb",
              quantity: 109,
              description: "A nice lamp",
              category: "Lighting",
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success");
              res.body.success.should.have.property("item");
              res.body.success.item.should.property("name", "Bulb");
              done();
            });
        });
    });
    it("It should change the quantity of item", (done) => {
      const data = {
        name: "Lamp",
        quantity: 109,
        description: "A nice lamp",
        category: "Lighting",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          const itemId = res.body.success.item._id;
          chai
            .request(app)
            .patch(`/item`)
            .query({
              _id: itemId,
              name: "Lamp",
              quantity: 218,
              description: "A nice lamp",
              category: "Lighting",
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success");
              res.body.success.should.have.property("item");
              res.body.success.item.should.property("quantity", 218);
              done();
            });
        });
    });
    it("It should change the optional fields of item", (done) => {
      const data = {
        name: "Lamp",
        quantity: 109,
        description: "A nice lamp",
        category: "Lighting",
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          const itemId = res.body.success.item._id;
          chai
            .request(app)
            .patch(`/item`)
            .query({
              _id: itemId,
              name: "Lamp",
              quantity: 218,
              description: "This is new description",
              category: "This is new category",
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success");
              res.body.success.should.have.property("item");
              res.body.success.item.should.property(
                "description",
                "This is new description"
              );
              res.body.success.item.should.property(
                "category",
                "This is new category"
              );
              done();
            });
        });
    });
    it("It should return invalid item id", (done) => {
      chai
        .request(app)
        .patch(`/item`)
        .query({
          _id: "invvalid987332id",
          name: "Lamp",
          quantity: 218,
          description: "This is new description",
          category: "This is new category",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message", "Invalid item id!");
          done();
        });
    });
  });

  // Test DELETE Route
  describe("/DELETE", () => {
    it("it should delete item by valid id", (done) => {
      const data = {
        name: "Temp Item",
        quantity: 76,
      };
      chai
        .request(app)
        .post("/item")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          const itemId = res.body.success.item._id;
          chai
            .request(app)
            .delete(`/item/${itemId}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success");
              res.body.success.should.have.property(
                "message",
                "Item deleted successfuly!"
              );
              done();
            });
        });
    });
    it("it should not accept invalid item id format", (done) => {
      const invalidId = "627ebae1a978e";
      chai
        .request(app)
        .delete(`/item/${invalidId}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message", "Item id is invalid!");
          done();
        });
    });
    it("it should return item not exists", (done) => {
      const invalidId = "627ebf51b7369788ae1a978e";
      chai
        .request(app)
        .delete(`/item/${invalidId}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property(
            "message",
            "Could not find item in database!"
          );
          done();
        });
    });
  });
});
