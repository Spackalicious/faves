var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // res.sendFile(path.join(__dirname, 'dist/browser/faves/index.html'));
    res.sendFile(path.join(__dirname, 'dist/faves/browser/index.html'));
});

module.exports = router;