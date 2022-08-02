const express = require("express");

// employeeRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /employee.
const employeeRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all employees.
employeeRoutes.route("/employee").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("Employees")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single employee by id
employeeRoutes.route("/employee/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    db_connect.collection("Employees").findOne(query, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you find employees by last name
employeeRoutes.route("/employee/search/:lastName").get(function (req, res) {
    let db_connect = dbo.getDb();
    let query = { lastName: new RegExp(req.params.lastName, "i") };
    db_connect
        .collection("Employees")
        .find(query)
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new employee.
employeeRoutes.route("/employee").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        active: req.body.active,
    };
    db_connect.collection("Employees").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update an employee by id.
employeeRoutes.route("/employee/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            active: req.body.active,
        },
    };
    db_connect
        .collection("Employees")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Employee document updated");
            response.json(res);
        });
});

// This section will help you delete an employee
employeeRoutes.route("/employee/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("Employees").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("Employee document deleted");
        response.json(obj);
    });
});

module.exports = employeeRoutes;
