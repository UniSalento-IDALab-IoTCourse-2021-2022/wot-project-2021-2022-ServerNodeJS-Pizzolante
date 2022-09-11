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

        // Gestione dell di una richiesta POST sul setting dei parametri
        app.post('/settings', (req, res) => {

            // Creo l'oggetto setting a partire dal body
            const newSetting = {
                base_stations: req.body.base_stations,
                moving_machinary: req.body.moving_machinary,
                reference_points: req.body.reference_points,
                rssi_values: req.body.rssi_values,
                distances: req.body.distances,
                tx_power: req.body.tx_power
            }

            // Inserisco il setting dei parametri solo se  la collection è vuota
            settings_collection.count(function (err, count) {
                if (!err && count === 0) {
                    settings_collection.insertOne(newSetting, (err, result) => {
                        res.status(200).send()
                    })
                } else {
                    res.status(400).send()
                }
            });
        })

    }

})

app.listen(3000, () => {
    console.log("Listening on port 3000...")
})