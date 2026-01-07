// required items
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

// set items
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// =====================taanveer469_db_user===============
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
    app.post("/users", async (req, res) => {
      const myUserDoc = req.body;
      console.log("new user ", myUserDoc);

      // Add 'await' here to wait for the DB to finish
      const result = await myColl.insertOne(myUserDoc);
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
    console.log("finally block run");
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
