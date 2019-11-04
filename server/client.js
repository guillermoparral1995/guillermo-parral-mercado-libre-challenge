const https = require('https');

requestPromise = (url) => {
    return new Promise((resolve, reject) => {
        let body = '';
        https.get(url, (response) => {
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                resolve(JSON.parse(body));
            })
        }).on('error', (error) => reject(error));
    })
};

exports.search = (query) => {
    return requestPromise(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
};

exports.getItemData = (query) => {
    return requestPromise(`https://api.mercadolibre.com/items/${query}`)
        .then((item) => {
            return Promise.all([
                requestPromise(`https://api.mercadolibre.com/items/${query}/description`),
                requestPromise(`https://api.mercadolibre.com/categories/${item.category_id}`)
            ]).then(responses => {
                return {item: item, description: responses[0], categories: responses[1]};
            })
        })
};