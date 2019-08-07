const jsdom = require('jsdom');
const https = require('https');
const parserService = require('./parsing.service');
const url = require('url');

async function getRegions() {
    const document = await getDocument('https://www.blocket.se'); // TODO Move url to config
    const regions = parserService.parseRegions(document);

    return regions;
}

async function search(request) {
    const path = buildPath(request);
    const document = await getDocument(path)
    const ads = parserService.parseAds(document);
    const pagination = parserService.parsePagination(document, request);

    return { ads, pagination };
}

function buildPath(request) {
    let basePath = 'https://www.blocket.se/hela_sverige' // TODO Move url to config
    const urlParts = url.parse(request.url, true);

    return urlParts.search ? `${basePath}${urlParts.search}` : basePath;
}

async function getDocument(url) {
    const promise = new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
            
            resp.on('data', (chunk) => {
                data += chunk;
            });
            
            resp.on('end', () => {
                const dom = new jsdom.JSDOM(data);
                resolve(dom.window.document);
            });
            
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message);
        });
    });

    return promise;
}

module.exports = { getRegions, search }