const express = require('express');
const cors = require('cors');
const service = require('./service');

const app = express();

app.use(cors());

app.get('/api/items', (req, res) => {
    service.getItemsList(req.query.q).then(items => res.json(items));
});

app.get('/api/items/:id', (req, res) => {
    service.getItemDetail(req.params.id).then(item => res.json(item));
});

app.listen(8080, () => {
    console.log('Server started in port 8080');
});