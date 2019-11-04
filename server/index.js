const express = require('express');
const cors = require('cors');
const service = require('./service');

const app = express();

app.use(cors());

app.get('/api/items', (req, res) => {
    service.getItemsList(req.query.q)
        .then(items => res.json(items))
        .catch(error => res.status(500).send(error));
});


app.get('/api/items/:id', (req, res) => {
    service.getItemDetail(req.params.id)
        .then(item => res.json(item))
        .catch(error => res.status(error.status).send(error));
});

app.listen(8080, () => {
    console.log('Server started in port 8080');
});