const express = require('express');
const router = express.Router();
const blocketService = require('./blocket.service');

router.get('/regions', getRegions);
router.get('/search', search);

module.exports = router;

async function getRegions(request, response) {
    const regions = await blocketService.getRegions();
    response.send(regions);
}

async function search(request, response) {
    const result = await blocketService.search(request);
    response.send(result);
}
