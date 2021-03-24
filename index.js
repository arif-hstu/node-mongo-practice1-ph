const express = require('express');
const bodyParser = require('body-parser');
// require mongoClient
const MongoClient = require('mongodb').MongoClient;

const password = 'pCWt1AYUBfqguj0W';
const uri = `mongodb+srv://arif-hstu:${password}@cluster0.rqnu2.mongodb.net/organicDb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.listen(3004, 'localhost')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
    const productCollection = client.db("organicDb").collection("products");

    // get data from database
    app.get('/products', (req, res) => {
        productCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // perform actions on the collection object
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        productCollection.insertOne(product)
            .then(result => {
                console.log('added succesfully')
                res.send('data added successfully')
            })
    })



});
