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
    model.OrderModel.find({_id: orderId}, function (err, order) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            model.DetailsModel.find({orderId: orderId}, function (err, orderdetails) {
                if(err){
                    res.render('error', { message: err, title: 'Error' });
                } else {
                    var productIds = [];
                    for (var i = 0; i < orderdetails.length; i++){
                        productIds.push(orderdetails[i].productId);
                    }

                    model.ProductModel.find({_id: {$in: productIds}}, function (err, productdetails) {
                        if(err){
                            res.render('error', { message: err, title: 'Error' });
                        } else {
                            res.render('orderdetails', {
                                order: order,
                                orderdetails: orderdetails,
                                productdetails: productdetails,
                                title: 'Details For Order ' + orderId
                            });
                        }
                        modelMongo.close();
                    })
                }
            });
        }
    });
});

module.exports = router;
