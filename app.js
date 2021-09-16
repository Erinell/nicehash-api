const NicehashJS = require("./nicehash")
const express = require("express")
require('dotenv').config()
const app = express()

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const organizationId = process.env.API_ORG_ID;
const port = process.env.SERVER_PORT;

const nhClient = new NicehashJS({
    apiKey,
    apiSecret,
    organizationId
});

const endpoints = [
    'wallets',
    'wallet/:currency',
    'payout',
    'hashpowerprofit',
    'rigs',
    'rigstats',
    'miningunpaid',
    'exchangerate',
    'miningAddress',
    'marketStats',
    'trades',
    'activeworkers'
]

app.get('/', (req, res) => {
    res.send('Page vide, allez <a href="/metrics">ici</a> !')
})

app.get('/metrics', (req, res) => {
    let html = "";
    endpoints.forEach(endpoint => {
        html += `<p><a href="${req.protocol}://${req.get('host')}${req.originalUrl}/${endpoint}">${endpoint}</a></p>\n`
            .replace(':currency', 'BTC');
    })
    res.send(html);

})

app.get(`/metrics/${endpoints[0]}`, async (req, res) => {
    try {
        let prom = await nhClient.getWallets();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[1]}`, async (req, res) => {
    try {
        const currency = req.params.currency;
        let prom = await nhClient.getWallet(currency);
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[2]}`, async (req, res) => {
    try {
        let prom = await nhClient.getPayouts();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[3]}`, async (req, res) => {
    try {
        let prom = await nhClient.getHashpowerEarnings();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[4]}`, async (req, res) => {
    try {
        let prom = await nhClient.getMiningRigs();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[5]}`, async (req, res) => {
    try {
        let prom = await nhClient.getMiningRigsStats();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[6]}`, async (req, res) => {
    try {
        let prom = await nhClient.getMiningUnpaid();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[7]}`, async (req, res) => {
    try {
        let prom = await nhClient.getExchangeRates();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[8]}`, async (req, res) => {
    try {
        let prom = await nhClient.getAdress();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[9]}`, async (req, res) => {
    try {
        let prom = await nhClient.getMarketStats();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[10]}`, async (req, res) => {
    try {
        const market = 'BTCEURS'; //req.params.market;
        let prom = await nhClient.getTrades(market);
        let data = prom.data;
        res.send(data);
    } catch (error) {
        res.status(500).end(error);
    }
})

app.get(`/metrics/${endpoints[11]}`, async (req, res) => {
    try {
        let prom = await nhClient.getActiveWorkers();
        let data = prom.data;
        res.send(data);
    } catch (error) {
        console.log(error);
        //res.status(500).end(error);
    }
})

app.listen(port, () => {
    console.log(`server start http://localhost:${port}`)
})