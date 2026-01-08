// required items
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// set items
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// =====================taanveer469_db_user===============
// send data from server to database via mongodb
// =====================hbjcd6XrTBVpiTRI==================
const uri =
  "mongodb+srv://taanveer469_db_user:hbjcd6XrTBVpiTRI@cluster0.89rnkti.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const myDb = client.db("usersDb");
    const myColl = myDb.collection("usersColl");

    //========== must need to use async await======
    // get() method
    app.get("/users", async (req, res) => {
      const myCursor = myColl.find();
      const result = await myCursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("find from server", id);
      // Convert the string ID into a MongoDB ObjectId
      const query = { _id: new ObjectId(id) };
      const result = await myColl.findOne(query);
      res.send(result);
    });

    // post() method
    app.post("/users", async (req, res) => {
      const myUserDoc = req.body;
      console.log("new user ", myUserDoc);
      // Add 'await' here to wait for the DB to finish
      const result = await myColl.insertOne(myUserDoc);
      res.send(result);
    });

    // put() method
    app.put("/users/:id", async (req, res) => {
      // 1st part
      const id = req.params.id;
      const user = req.body;
      console.log("updated user", user);
      // 2nd part
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      const options = { upsert: true };
      const result = await myColl.updateOne(query, update, options);
      res.send(result);
    });

    // delete() method
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete from server", id);
      // Convert the string ID into a MongoDB ObjectId
      const query = { _id: new ObjectId(id) };
      const result = await myColl.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.log("finally function run");
  }
}
run().catch(console.dir);

// get() method
app.get("/", (req, res) => {
  res.send("simple crud is running");
});

// listen() method
app.listen(port, () => {
  console.log(`simple crud is running on port : ${port}`);
});
