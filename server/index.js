const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();

app.use(cors());

app.get('/api/items', (req, res) => {
    let body = '';
    https.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`, (response) => {
        response.on('data', (chunk) => {
            body += chunk;
        })
        response.on('end', () => {
            const json = JSON.parse(body);
            res.json(json);
        })
    }).on('error', (error) => console.error(error));
})

app.get('/api/items/:id', (req, res) => {
    const promisifiedItem = new Promise((resolve, reject) => {
        let body = '';
        https.get(`https://api.mercadolibre.com/items/${req.params.id}`, (response) => {
            response.on('data', (chunk) => {
                body += chunk;
            })
            response.on('end', () => {
                resolve(JSON.parse(body));
            })
        }).on('error', (error) => reject(error));
    });
    const promisifiedDescription = new Promise((resolve, reject) => {
        let body = '';
        https.get(`https://api.mercadolibre.com/items/${req.params.id}/description`, (response) => {
            response.on('data', (chunk) => {
                body += chunk;
            })
            response.on('end', () => {
                resolve(JSON.parse(body));
            })
        }).on('error', (error) => reject(error));
    });
    Promise.all([promisifiedItem, promisifiedDescription]).then((responses) => {
        const item = responses[0];
        const desc = responses[1];
        res.json({item: item, description: desc});
    }).catch(error => console.log(error));
});

app.listen(8080, () => {
    console.log('Server started in port 8080');
});