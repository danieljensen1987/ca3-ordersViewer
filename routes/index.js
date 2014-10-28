var express = require('express');
var router = express.Router();
var model = require('../database/model');
var modelMongo = require('../database/modelMongo');

function comparator(a, b) {
    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
}

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Home' });
});

router.get('/orders', function(req, res) {
    modelMongo.connect();
    model.OrderModel.find({}, function (err, orders) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            res.render('orders', { orders: orders.sort(comparator), title: 'Orders' });
        }
        modelMongo.close();
    })
});

router.get('/orderdetails/:id', function(req, res){
    modelMongo.connect();
    var id = req.params.id;
    model.OrderModel.find({_id: id}, function(err, order){
        if(err){
            res.render('error', { message: err, title: 'Error' });
        } else {

            model.DetailsModel.find({orderId: id}, function(err, orderDetails){
                if(err){
                    res.render('error', { message: err, title: 'Error' });
                } else {
                    var productIds = [];
                    for(var i = 0; i < orderDetails.length; i++){
                       productIds.push(orderDetails[i].productId);
                    }

                    model.ProductModel.find({_id: {$in:productIds}}, function(err, productDetails){
                        if(err){
                            res.render('error', { message: err, title: 'Error' });
                        } else {
                            res.render('orderdetails', {
                                order: order,
                                orderDetails: orderDetails,
                                productDetails: productDetails,
                                title: 'Orderdetails'});
                        }
                        modelMongo.close();
                    })
                }
            })
        }
    })
});
module.exports = router;