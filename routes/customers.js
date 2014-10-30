var express = require('express');
var router = express.Router();
var model = require('../database/model');
var modelMongo = require('../database/modelMongo');

function sortById(a, b) {
    return a._id - b._id;
}

router.get('/', function(req, res) {
    modelMongo.connect();
    model.CustomerModel.find({}, function (err, customers) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            res.render('customers', { customers: customers.sort(), title: 'Customers' });
        }
        modelMongo.close();
    })
});

router.get('/:customerId', function (req, res) {
    var customerId = req.params.customerId;
    modelMongo.connect();
    model.CustomerModel.find({_id: customerId}, function (err, customer) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            model.OrderModel.find({customerId: customerId}, function (err, orders) {
                if (err){
                    res.render('error', { message: err, title: 'Error' });
                } else {
                    res.render('customerdetails', {
                        customer: customer,
                        orders: orders.sort(sortById),
                        title: 'Details For ' + customer[0].companyName});
                }
                modelMongo.close();
            });
        }
    })
});

module.exports = router;
