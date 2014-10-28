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

router.get('/orderdetails/:id', function(req, res){
    modelMongo.connect();
    var id = req.params.id;
    model.OrderModel.find({_id: id}, function(err, order){
        if(err){
            res.render('orderdetails', {order: err, title:'Orderdetails'});
        } else {
            console.log(order);
            res.render('orderdetails', {order: order, title: 'Orderdetails'});
        }
        modelMongo.close();
    })
})
module.exports = router;