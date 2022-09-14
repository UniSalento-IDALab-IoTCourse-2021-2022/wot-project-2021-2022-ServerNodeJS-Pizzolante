const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017"

app.use(express.json())

// Connessione a MongoDb all'indirizzo mongodb://localhost:27017
mongoClient.connect(url, (err, db) => {

    if (err) {
        console.log("Error while connecting mongo client")
    } else {

        // Definisco il nome del database e delle collections presenti
        const myDb = db.db('worksafe_db')
        const settings_collection = myDb.collection('settings')
        const beacons_collection = myDb.collection('beacons')
        const risks_collection = myDb.collection('risks')

        // Gestione dell di una richiesta GET sul setting dei parametri
        app.get('/settings', (req, res) => {

            settings_collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })

        })// app.get

        // Gestione dell di una richiesta GET sul setting dei parametri
        app.get('/beacons', (req, res) => {

            beacons_collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })

        })// app.get

        /*app.post('/risks', (req, res) => {

            // Creo l'oggetto setting a partire dal body
            const newRisk = {
                reference_points: req.body.reference_points,
                security_distance: req.body.security_distance,
                rssi_values: req.body.rssi_values,
                distances: req.body.distances,
                tx_power: req.body.tx_power
            }

            // Inserisco il setting dei parametri solo se  la collection è vuota
            risks_collection.count(function (err) {
                if (!err) {
                    settings_collection.insertOne(newSetting, (err, result) => {
                        res.status(200).send()
                    })
                } else {
                    res.status(400).send()
                }
            });

        })*/

    }

})

app.listen(3000, () => {
    console.log("Listening on port 3000...")
})