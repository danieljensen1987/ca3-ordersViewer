var express = require('express');
var router = express.Router();
var model = require('../database/model');
var modelMongo = require('../database/modelMongo');

function sortById(a, b) {
    return a._id - b._id;
}

function sortByOrderId(a, b) {
    return a.orderId - b.orderId;
}

router.get('/', function(req, res) {
    modelMongo.connect();
    model.ProductModel.find({}, function (err, products) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            res.render('products', { products: products.sort(sortById), title: 'Products' });
        }
        modelMongo.close();
    })
});

router.get('/:productId', function (req, res) {
    var productId = req.params.productId;
    modelMongo.connect();
    model.DetailsModel.find({productId: productId}, function (err, details) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            model.ProductModel.find({_id: productId}, function (err, product) {
                if (err){
                    res.render('error', { message: err, title: 'Error' });
                } else {
                    res.render('productdetails', { details: details.sort(sortByOrderId), title: 'Details For ' + product[0].name});
                }
                modelMongo.close();
            })
        }
    });
});

module.exports = router;
