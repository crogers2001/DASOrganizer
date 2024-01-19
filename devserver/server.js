const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://crogers2001:Collincr3@dasorganizer.c8tw1p0.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db('Master');

app.post('/api/members', async (req, res) => {
  const newMember = req.body;

  console.log('Received POST request:', newMember);

  try {
    const result = await database.collection('members').insertOne(newMember);

    console.log('Performance added successfully:', newMember);

    res.json({ success: true, message: 'Performance added successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/performances', async (req, res) => {
  const newPerformance = req.body;

  console.log('Received POST request:', newPerformance);

  try {
    const result = await database.collection('performances').insertOne(newPerformance);

    console.log('Performance added successfully:', newPerformance);

    res.json({ success: true, message: 'Performance added successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/members', async (req, res) => {
  try {
    const existingData = await database.collection('members').find().toArray();
    res.json({ success: true, data: existingData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/performances', async (req, res) => {
  //use findOne instead of find to fetch a singular document
  try {
    const existingData = await database.collection('performances').find().toArray();
    res.json({ success: true, data: existingData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/performances/:id', async (req, res) => {
  const { id } = req.params; // Extract _id from the URL parameter

  try {
    const existingData = await database.collection('performances').findOne({ _id: new ObjectId(id) });

    if (!existingData) {
      // If no performance is found, return a 404 status
      res.status(404).json({ success: false, message: 'Performance not found' });
      return;
    }

    res.json({ success: true, data: existingData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  console.log(`Server is running on port ${PORT}`);
});
