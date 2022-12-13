const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(bodyParser.json())
app.use(cors());

const port = 5000

app.get('/', (req, res) => {
    res.send("Hello from db working!");
});
//localhost:5000

//Mongo DB Start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2ldzsy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("Doctor-Portal").collection("appointments");
  // perform actions on the collection object
  // Add Appointment from here and Sending DataBase
    app.post('/addAppointment', (req, res) => {
        const appointment = req.body;
        appointmentCollection.insertOne(appointment)
        .then(result => {
            console.log('Appointment Added ', result);
            res.send(result.insertedCount);
        });
    });
});
//Mongo DB End

app.listen(process.env.PORT || port);