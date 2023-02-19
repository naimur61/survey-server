const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.pathname || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.guif9pr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
   try {
      const surveyCollection = client.db('customer_survey').collection('surveys');
      const questionCollection = client.db('customer_survey').collection('question');

      app.post('/survey', async (req, res) => {
         const surveys = req.body.surveysDetails;
         const results = await surveyCollection.insertMany(surveys);
         res.send(results);
      });

      app.get('/question', async (req, res) => {
         const query = {};
         const result = await questionCollection.find(query).toArray();
         res.send(result)
      })

   } finally { }
}
run().catch(er => console.log(er))




app.get('/', (req, res) => { res.send('Survey server is running !') });


app.listen(port, () => {
   console.log(`survey is running ${port}`);
})
