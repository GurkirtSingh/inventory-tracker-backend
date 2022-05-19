/**
 * Test file - contain tests for APIs on route /item
 */
process.env.NODE_ENV = "test";

const Warehouse = require("../models/Warehouse");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { assert } = require("chai");
const should = chai.should();

chai.use(chaiHttp);

describe("Warehouse APIs", () => {
  beforeEach((done) => {
    Warehouse.remove({}, (err) => {
      done();
    });
  });
  // Test /POST Route
  describe("/POST Warehouse", () => {
    it("it should post new warehouse object", (done) => {
      const tempWarehouse = {
        name: "Whistler",
        location: "276 Eva Lake Rd.",
        comment: "A whistler location",
      };
      chai
        .request(app)
        .post("/warehouse")
        .send(tempWarehouse)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.success.should.have.property("warehouse");
          res.body.success.warehouse.should.have.property("name", "Whistler");
          res.body.success.warehouse.should.have.property(
            "location",
            "276 Eva Lake Rd."
          );
          res.body.success.warehouse.should.have.property(
            "comment",
            "A whistler location"
          );
          done();
        });
    });
  });
  // Test /GET Route
  describe("/GET Warehouse", () => {
    it("it should get the warehouse by id", (done) => {
      const tempWarehouse = {
        name: "Whistler",
        location: "276 Eva Lake Rd.",
        comment: "A whistler location",
      };
      chai
        .request(app)
        .post("/warehouse")
        .send(tempWarehouse)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          const newItemId = res.body.success.warehouse._id;
          chai
            .request(app)
            .get(`/warehouse/${newItemId}/getone`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success");
              res.body.success.should.have.property("warehouse");
              res.body.success.warehouse.should.have.property(
                "name",
                "Whistler"
              );
              res.body.success.warehouse.should.have.property(
                "location",
                "276 Eva Lake Rd."
              );
              res.body.success.warehouse.should.have.property(
                "comment",
                "A whistler location"
              );
              done();
            });
        });
    });
    it("it should get all the warehouses", (done) => {
      chai
        .request(app)
        .get("/warehouse")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.success.should.have.property("warehouses");
          res.body.success.warehouses.should.be.a("array");
          res.body.success.warehouses.length.should.be.eql(0);
          done();
        });
    });
  });
});
