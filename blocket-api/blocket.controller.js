const express = require('express');
const router = express.Router();
const blocketService = require('./blocket.service');
const url = require('url');
const queryString = require('query-string');

router.get('/regions', getRegions);
router.get('/search', search);

module.exports = router;

async function getRegions(request, response) {
    const regions = [];
    blocketService.getDocument('https://www.blocket.se').then(document => {
        console.log(document);
        const areas = document.getElementsByClassName('region_link_list');

        for (i = 0; i < areas.length; i++) {
            region = areas[i];

            regions.push({
                'name': region.text,
                'href': region.getAttribute('href'),
                'regionNumber': region.getAttribute('data-region')
            })
        }

        response.send(regions);

    }).catch(error => console.log(error));
}

function search(request, response) {
    path = buildPath(request);
    console.log(path);

    blocketService.getDocument(path).then(document => {
        const ads = getAds(document);
        const pagination = getPagination(document, request);

        response.send({ ads, pagination });
    }).catch((error) => console.log(error));
}

function getAds(document) {
    const ads = [];
    const itemList = document.getElementById('item_list');
    if (itemList) {
        const articles = itemList.getElementsByTagName('article');
        
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const price = article.getElementsByClassName('list_price')[0].textContent;
            const date = article.getElementsByTagName('time')[0].textContent;
            const header = article.getElementsByTagName('h1')[0].getElementsByTagName('a')[0];
            const title = header.getAttribute('title');
            const url = header.getAttribute('href');

            const image = article.getElementsByTagName('img')[0];
            const imageSrc = image ? image.getAttribute('longdesc') || image.getAttribute('src') : null;           
            ads.push({ title, price, date, url, imageSrc });
        }
    }
    return ads;
}

function getPagination(document, request) {
    const allPages = document.getElementById('all_pages');
    let pages = [];

    if (allPages) {   
        const pagination = allPages.getElementsByTagName('a');

        for (let i = 0; i < pagination.length; i++) {
            const page = pagination[i];
            const queryString = page.getAttribute('href');
            const name = page.text.replace(/\r?\n?/g, '').trim();

            const pageNumber = parsePageNumber(queryString);
            const isActive = isPageActive(pageNumber, request);
            pages.push({ name, queryString, pageNumber, isActive })
        }
    }

    return pages;
}

function isPageActive(pageNumber, request) {
    const urlParts = url.parse(request.url, true);
    const queryParts = queryString.parse(urlParts.search);

    if (queryParts.o === pageNumber) {
        return true;
    } else if (queryParts.o && pageNumber === 1) {
        return true
    }
    return false;
}

function parsePageNumber(query) {    
    const queryParts = queryString.parse(query);
    
    return queryParts.o;
    
}

function buildPath(request) {
    let basePath = 'https://www.blocket.se/hela_sverige'
    const urlParts = url.parse(request.url, true);

    return urlParts.search ? `${basePath}${urlParts.search}` : basePath;
}