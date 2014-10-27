var express = require('express');
var router = express.Router();
var model = require('../database/model');
var modelMongo = require('../database/modelMongo');

function comparator(a, b) {
    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
}

/* GET home page. */
router.get('/', function(req, res) {
    modelMongo.connect();
    model.OrderModel.find({}, function (err, orders) {
        if (err){
            res.render('index', { orders: err, title: 'Orders' });
        } else {
            res.render('index', { orders: orders.sort(comparator), title: 'Orders' });
        }
        modelMongo.close();
    })
});

module.exports = router;
