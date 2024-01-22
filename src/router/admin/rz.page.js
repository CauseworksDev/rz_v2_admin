const express = require('express');
const request = require('request');
const router = express.Router();
let leadingZeros = function (n, digits) {
    let zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++) zero += '0';
    }
    return zero + n;
};
router.post('/', function(req, res, next) {
    res.send(200)
});
router.get('/', function(req, res, next) {
    res.redirect(`/admin/office/content`)
});


module.exports = router;
