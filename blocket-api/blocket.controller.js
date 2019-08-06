const express = require('express');
const router = express.Router();
const blocketService = require('./blocket.service');
const url = require('url');

const parser = require('./parsing.service');

router.get('/regions', getRegions);
router.get('/search', search);

module.exports = router;


async function getRegions(request, response) {
    blocketService.getDocument('https://www.blocket.se').then(document => {
        const regions = parser.parseRegions(document);

        response.send(regions);
    })
    .catch(error => console.log(error));
}

function search(request, response) {
    const path = buildPath(request);

    blocketService.getDocument(path).then(document => {
        const ads = parser.parseAds(document);
        const pagination = parser.parsePagination(document, request);

        response.send({ ads, pagination });
    })
    .catch((error) => console.log(error));
}

function buildPath(request) {
    let basePath = 'https://www.blocket.se/hela_sverige'
    const urlParts = url.parse(request.url, true);

    return urlParts.search ? `${basePath}${urlParts.search}` : basePath;
}
