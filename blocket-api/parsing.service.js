const url = require('url');
const queryString = require('query-string');


function parseAds(document) {
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

function parsePagination(document, request) {
    const parsedPages = [];
    const htmlPagination = document.getElementById('all_pages');

    if (htmlPagination) {
        const pagination = htmlPagination.getElementsByTagName('a');

        for (let i = 0; i < pagination.length; i++) {
            const page = pagination[i];
            const queryString = page.getAttribute('href');
            const name = page.text.replace(/\r?\n?/g, '').trim();
            const pageNumber = parsePageNumber(queryString);
            const isActive = isPageActive(pageNumber, request);

            parsedPages.push({ name, queryString, pageNumber, isActive });
        }
    }

    return parsedPages;
}

function parseRegions(document) {
    const regions = [];
    const htmlRegions = document.getElementsByClassName('region_link_list');

    for (i = 0; i < htmlRegions.length; i++) {
        const htmlRegion = htmlRegions[i];

        const name = htmlRegion.text;
        const href = htmlRegion.getAttribute('href');
        const regionNumber = htmlRegion.getAttribute('data-region');

        regions.push({ name, href, regionNumber });
    }

    return regions;
}

function parsePageNumber(query) {
    const queryParts = queryString.parse(query);

    return queryParts.o;
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

module.exports = { parsePagination, parseRegions, parseAds }