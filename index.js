const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"
app.use(express.json())

// Gestione dell di una richiesta GET sul setting dei parametri
app.get('/settings', (req, res) => {
    // Connessione a MongoDb all'indirizzo mongodb://localhost:27017
    mongoClient.connect(url, (err, db) => {
        const myDb = db.db('worksafe_db')
        const settings_collection = myDb.collection('settings')
        if (err) {
            console.log("Error while connecting mongo client")
        } else {
            settings_collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })
        }
    })// mongo.connect
})// app.get

app.get('/beacons', (req, res) => {
    // Connessione a MongoDb all'indirizzo mongodb://localhost:27017
    mongoClient.connect(url, (err, db) => {
        const myDb = db.db('worksafe_db')
        const beacons_collection = myDb.collection('beacons')
        if (err) {
            console.log("Error while connecting mongo client")
        } else {
            beacons_collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })
        }
    })// mongo.connect
})// app.get

app.post('/dangers', (req, res) => {
    // Connessione a MongoDb all'indirizzo mongodb://localhost:27017
    mongoClient.connect(url, (err, db) => {
        const myDb = db.db('worksafe_db')
        const dangers_collection = myDb.collection('dangers')
        if (err) {
            console.log("Error while connecting mongo client")
        } else {
            // Creo l'oggetto setting a partire dal body
            const newDanger = {
                worker_id: req.body.workerId,
                beacon_id: req.body.beaconId,
                message: req.body.message,
                timestamp: req.body.timestamp
            }

            // Inserisco il setting dei parametri solo se  la collection è vuota
            dangers_collection.count(function (err) {
                if (!err) {
                    dangers_collection.insertOne(newDanger, (err, result) => {
                        res.status(200).send()
                    })
                } else {
                    res.status(400).send()
                }
            });
        }
    }) // mongo.connection
})// app.post

app.listen(3000, () => {
    console.log("Listening on port 3000...")
})