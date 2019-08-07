const express = require('express');
const router = express.Router();
const blocketService = require('./blocket.service');

router.get('/regions', getRegions);
router.get('/search', search);

module.exports = router;

async function getRegions(request, response) {
    try {
        const regions = await blocketService.getRegions();
        response.send(regions);
    } catch(error) {
        response.status(500).send(error);
    }
}

async function search(request, response) {
    try {
        const result = await blocketService.search(request);
        response.send(result);
    } catch(error) {
        response.status(500).send(error);
    }
}
