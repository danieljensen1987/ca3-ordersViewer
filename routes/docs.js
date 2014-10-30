var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    var pdf = "../doc/CA3Rapport.pdf";
    fs.readFile(pdf, function (err, data){
        res.contentType("application/pdf");
        res.end(data);
    });
});


module.exports = router;
