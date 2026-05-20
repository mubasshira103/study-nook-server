const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

const uri =
  'mongodb+srv://study-nook:jpWFgJIwYO1GMAu9@cluster1.vpbp7hv.mongodb.net/?appName=cluster1';
// p  jpWFgJIwYO1GMAu9
// u  study-nook

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
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    const db = client.db('studyNookdb');
    const userCollection = db.collection('studyNookCollection');

    app.get('/rooms', async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
