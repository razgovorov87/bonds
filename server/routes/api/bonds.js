const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

const url = 'mongodb://1QNY0B3RHm:cBjhRDQ4uW@82.148.31.138:27017/ps?authSource=bonds'
// 'mongodb://admin:admin@veleslavdb-shard-00-00-kxrp7.mongodb.net:27017,veleslavdb-shard-00-01-kxrp7.mongodb.net:27017,veleslavdb-shard-00-02-kxrp7.mongodb.net:27017/test?ssl=true&replicaSet=VeleslavDB-shard-0&authSource=admin&retryWrites=true&w=majority'


//GET
router.get('/', async (req, res) => {
    const bonds = await loadBondsCollection();
    res.send(await bonds.find().toArray());
});


//Add
router.post('/', async (req, res) => {
    const bonds = await loadBondsCollection();
    await bonds.insertOne({
        bondId: req.body.bondId,
        bondname: req.body.bondname,
        profit: req.body.profit,
        duration: req.body.duration
    });
    res.status(201).send()
});


//Delete


async function loadBondsCollection() {
    const client = await mongodb.MongoClient.connect
    (url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db("bonds").collection("dur-doh");
}

module.exports = router;