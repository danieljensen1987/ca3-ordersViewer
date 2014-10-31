var express = require('express');
var router = express.Router();
var model = require('../database/model');
var modelMongo = require('../database/modelMongo');

function sortByDate(a, b) {
    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
}

/* GET home page. */
router.get('/', function(req, res) {
    modelMongo.connect();
    model.CategoryModel.find({}, function (err, categories){
        if (err){
            res.render('error', { message: err, title: 'Orders' });
        } else {
            res.render('index', { categories: categories, title: 'Home' });
        }
        modelMongo.close();
    })

});

router.get('/orders', function(req, res) {
    modelMongo.connect();
    model.OrderModel.find({}, function (err, orders) {
        if (err){
            res.render('error', { message: err, title: 'Orders' });
        } else {
            res.render('orders', { orders: orders.sort(sortByDate), title: 'Orders' });
        }
        modelMongo.close();
    })
});

router.get('/orderdetails/:orderId', function (req, res) {
    var orderId = req.params.orderId;
    modelMongo.connect();
    model.DetailsModel.find({order: orderId})
        .populate('product')
        .populate('order')
        .exec(function(err, details) {
            if (err){
                res.render('error', { message: err, title: 'Error' });
            } else {
                res.render('orderdetails', { details: details, title: 'Details For Order ' + orderId});
            }
            modelMongo.close();
        });
});

module.exports = router;
