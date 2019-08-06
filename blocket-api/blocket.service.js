const jsdom = require('jsdom');
const https = require('https');


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

module.exports = { getDocument }