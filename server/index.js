const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

//middleware
app.use(bodyParser.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1hh0e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("emaJhonStore").collection("products");
  const ordersCollection = client.db("emaJhonStore").collection("orders");

  console.log("database connected");

  app.post('/addProduct',(req,res)=>{
      const products = req.body;
      productsCollection.insertOne(products)
      .then(result => {
          console.log(result.insertedCount);
          res.send(result.insertedCount);
      })

  })
  app.get('/products',(req,res) => {
    const search = req.query.search;
    productsCollection.find({name:{$regex:search}})
      .toArray((err,documents) => {
        res.send(documents);
      })
  })

  app.get('/product/:key',(req,res) => {
    productsCollection.find({key:req.params.key})
      .toArray((err,documents) => {
        res.send(documents[0]);
      })
  })

  app.post('/productsByKeys',(req,res) => {
      const porductKeys = req.body;
      productsCollection.find({key:{ $in:porductKeys }})
      .toArray((err,documents)=>{
          res.send(documents);
      })
  })

  app.post('/addOrder',(req,res)=>{
    const orders = req.body;
    ordersCollection.insertOne(orders)
    .then(result => {
        res.send(result.insertedCount > 0);
    })

})

});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen( process.env.PORT || port)