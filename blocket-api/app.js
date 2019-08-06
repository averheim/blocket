const express = require('express');
const cors = require('cors');
const https = require('https');
const jsdom = require('jsdom');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./blocket.controller'));

app.listen(3000, () => console.log('Server running on port 3000!'));

