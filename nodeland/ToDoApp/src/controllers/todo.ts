import { Request, Response } from "express";
import assert from "assert";
// I think these next three are all about session management.
// connect-mongo is a "MongoDB session store for Connect and Express".
// So I don't want session stuff, I just want to retrieve my TODOs.
// import mongo from "connect-mongo";
// import session from "express-session";
// const MongoStore = mongo(session);
import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const dbName = "KaiserslauternToDos";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  // is this async?
  // can I return rows?
  // Create a new MongoClient
  const client: MongoClient = new MongoClient();
  let todos: any;
  // Use connect method to connect to the Server
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);

    const col = db.collection("KTown");

    // Get first two documents that match the query
    col.find({ priority: "low" }).limit(2).toArray(function (err, docs) {
      assert.equal(undefined, err);
      todos = docs;
      assert.equal(2, docs.length);
      client.close();
      res.render("todo", {
        title: "ToDo",
        pple: todos
      });
    });
  });



};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
export let postContact = (req: Request, res: Response) => {
  req.assert("name", "Name cannot be blank").notEmpty();
  req.assert("email", "Email is not valid").isEmail();
  req.assert("message", "Message cannot be blank").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/contact");
  }

  console.log("At least we get to the route.");
  const client: MongoClient = new MongoClient();

  // Use connect method to connect to the Server
  MongoClient.connect(url, (err, client) => {
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    db.collection("KTown").insertOne({ a: 1 }, function (err, r) {
      // assert.equal(null, err);
      assert.equal(1, r.insertedCount);

      // // Insert multiple documents
      // db.collection("inserts").insertMany([{ a: 2 }, { a: 3 }], function (err, r) {
      //   assert.equal(null, err);
      //   assert.equal(2, r.insertedCount);

      //   client.close();
      // });
    });
  });

  req.flash("success", { msg: "Email has been sent successfully!" });
  res.redirect("/contact");
};

