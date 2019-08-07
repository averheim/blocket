const parsingService = require('../parsing.service');
const jsdom = require('jsdom');

let mockHtml = '';
let document = '';

describe('parseAds given two ads', () => {
    beforeEach(() => {
        mockHtml = getMockHtmlAds();
        document = new jsdom.JSDOM(mockHtml).window.document;
    });

    it('should return two ads', () => {
        const ads = parsingService.parseAds(document);
        expect(ads.length).toEqual(2);
    });

    it('should return expected values', () => {
        const [firstAd] = parsingService.parseAds(document);

        expect(firstAd.title).toEqual('Title 1');
        expect(firstAd.price).toEqual('100');
        expect(firstAd.date).toEqual('Now');
        expect(firstAd.url).toEqual('firstAdUrl');
        expect(firstAd.imageSrc).toEqual('firstImageUrl');
    });
});

describe('parseAds given no ads', () => {
    it('should return empty list', () => {
        document = new jsdom.JSDOM(null).window.document;
        const ads = parsingService.parseAds(document);
        expect(ads.length).toEqual(0);
    });
});

describe('parsePagination given no pages', () => {
    it('should return empty list', () => {
        document = new jsdom.JSDOM(null).window.document;
        const ads = parsingService.parsePagination(document);
        expect(ads.length).toEqual(0);
    });

    describe('parsePagination given 3 pages, first page is active', () => {
        beforeEach(() => {
            mockRequest = getMockRequest();
            mockHtml = getMockedHtmlPagination();
            document = new jsdom.JSDOM(mockHtml).window.document;
        });

        it('should return 3 page', () => {
            const pagination = parsingService.parsePagination(document, mockRequest);
            expect(pagination.length).toEqual(3);
        });

        it('should return expected values', () => {
            const [firstPage] = parsingService.parsePagination(document, mockRequest);
            expect(firstPage.name).toEqual('1');
            expect(firstPage.pageNumber).toEqual('1');
            expect(firstPage.isActive).toEqual(true);
            expect(firstPage.queryString).toEqual('?o=1');
        });

        it('second page should be inactive', () => {
            const pages = parsingService.parsePagination(document, mockRequest);
            expect(pages[1].isActive).toEqual(false);
        });
    });

    describe('parseRegions given 2 regions', () => {
        beforeEach(() => {
            mockHtml = getMockedHtmlRegions();
            document = new jsdom.JSDOM(mockHtml).window.document;
        });

        it('should return 2 regions', () => {
            const regions = parsingService.parseRegions(document);
            expect(regions.length).toEqual(2);
        });

        it('should return expected values', () => {
            const [regionOne] = parsingService.parseRegions(document);
            expect(regionOne.name).toEqual('Region1');
            expect(regionOne.href).toEqual('?r=1');
            expect(regionOne.regionNumber).toEqual('1');
        });

    });

    describe('parseRegions given no regions', () => {
        it('should return empty list', () => {        
            document = new jsdom.JSDOM(null).window.document;
            const regions = parsingService.parseRegions(document);
            expect(regions.length).toEqual(0);
        });
    });
});

function getMockRequest() {
    return {
        'url': 'mock.mock?o=1'
    };
}

function getMockedHtmlRegions() {
    return `
        <a class="region_link_list" href="?r=1" data-region="1">Region1</a>
        <a class="region_link_list" href="?r=2" data-region="2">Region2</a>
    `;
}

function getMockedHtmlPagination() {
    return `
    <div id="all_pages">
        <a href="?o=1">1</a>
        <a href="?o=2">2</a>
        <a href="?o=3">3</a>
    </div>`;
}

function getMockHtmlAds() {
    return `
    <div id="item_list">
        <article>
            <div class="list_price">100</div>
            <time>Now</time>
            <h1>
                <a title="Title 1" href="firstAdUrl"></a>
            </h1>
            <img src="firstImageUrl"/>
        </article>
        <article>
            <div class="list_price">200</div>
            <time>Now</time>
            <h1>
                <a title="Title 2" href="..."></a>
                </h1>
            <img longdesc=".."/>
        </article>
    </div>`;
}
