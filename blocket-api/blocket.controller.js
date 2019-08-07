const express = require('express');
const router = express.Router();
const url = require('url');
const blocketService = require('./blocket.service');
const parserService = require('./parsing.service');


router.get('/regions', getRegions);
router.get('/search', search);

module.exports = router;


async function getRegions(request, response) {
    blocketService.getDocument('https://www.blocket.se').then(document => { // TODO Move url to config
        const regions = parserService.parseRegions(document);

        response.send(regions);
    })
    .catch(error => console.log(error));
}

function search(request, response) {
    const path = buildPath(request);

    blocketService.getDocument(path).then(document => {
        const ads = parserService.parseAds(document);
        const pagination = parserService.parsePagination(document, request);

        response.send({ ads, pagination });
    })
    .catch((error) => console.log(error));
}

function buildPath(request) {
    let basePath = 'https://www.blocket.se/hela_sverige' // TODO Move url to config
    const urlParts = url.parse(request.url, true);

    return urlParts.search ? `${basePath}${urlParts.search}` : basePath;
}
