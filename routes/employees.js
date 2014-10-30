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
    model.EmployeeModel.find({}, function (err, employees) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            res.render('employees', { employees: employees.sort(sortById), title: 'Employees' });
        }
        modelMongo.close();
    })
});

router.get('/:employeeId', function (req, res) {
    var employeeId = req.params.employeeId;
    modelMongo.connect();
    model.EmployeeModel.find({_id: employeeId}, function (err, employee) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            model.OrderModel.find({employeeId: employeeId}, function (err, orders) {
                if (err){
                    res.render('error', { message: err, title: 'Error' });
                } else {
                    res.render('employeedetails', {
                        employee: employee,
                        orders: orders.sort(sortById),
                        title: 'Details For ' + employee[0].firstName[0] + ', ' + employee[0].lastName});
                }
                modelMongo.close();
            });
        }
    })
});

module.exports = router;
