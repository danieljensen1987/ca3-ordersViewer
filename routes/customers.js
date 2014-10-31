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

    model.OrderModel.find({customer: customerId})
        .populate('customer')
        .exec(function(err, details) {
            if (err){
                res.render('error', { message: err, title: 'Error' });
            } else {
                res.render('customerdetails', { details: details.sort(sortById), title: 'Details For '});
            }
            modelMongo.close();
        });
});

module.exports = router;
