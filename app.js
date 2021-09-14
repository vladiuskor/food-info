const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
let dataObject = JSON.parse(data);


const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true); // url.parse() is deprecated

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(404, {'Content-type': 'text/html'});

        const cardsHtml = dataObject.map(elem => replaceTemplate(tempCard, elem)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);

        //Product page
    } else if (pathname === '/product') {
        res.writeHead(404, {'Content-type': 'text/html'});
        const product = dataObject[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

        //API
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
        // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello!'
        });
        res.end('<h1>Uuuups! Page not found!</h1>');
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is listening on 8000 port ')
});

let str = "love you";

