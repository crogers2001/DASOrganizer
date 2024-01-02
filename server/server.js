const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb+srv://crogers2001:Collincr3@dasdatabase.qbrfyfg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToMongoDB();

const db = client.db("DASDatabase"); // Replace with your actual database name

const semesterCollection = db.collection("semesters");
const dancerCollection = db.collection("dancers");
const performanceCollection = db.collection("performances");

// Example route to add a semester
app.post('/add-semester', async (req, res) => {
  try {
    const semesterData = req.body; // Assuming you'll send the semester data in the request body
    const result = await semesterCollection.insertOne(semesterData);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error("Error adding semester:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Similar routes can be created for adding dancers and performances

app.post('/add-dancer', async (req, res) => {
    try {
      const dancerData = req.body;
      const result = await dancerCollection.insertOne(dancerData);
      res.status(201).json(result.ops[0]);
    } catch (err) {
      console.error("Error adding dancer:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Example route to add a performance
  app.post('/add-performance', async (req, res) => {
    try {
      const performanceData = req.body;
      const result = await performanceCollection.insertOne(performanceData);
      res.status(201).json(result.ops[0]);
    } catch (err) {
      console.error("Error adding performance:", err);
      res.status(500).send("Internal Server Error");
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
