var express = require('express');
var router = express.Router();
var model = require('../database/model');
var modelMongo = require('../database/modelMongo');

function sortById(a, b) {
    return a._id - b._id;
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
    model.OrderModel.find({employee: employeeId})
        .populate('employee')
        .exec(function(err, details) {
            if (err){
                res.render('error', { message: err, title: 'Error' });
            } else {
                console.log(details);
                res.render('employeedetails', { details: details.sort(sortById), title: 'Details For '});
            }
            modelMongo.close();
        });
});

router.delete('/:employeeId', function (req, res) {
    var employeeId = req.params.employeeId;
    modelMongo.connect();
    model.EmployeeModel.remove({ _id: employeeId }, function (err, details) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            console.log('virker ikke');
            res.redirect('index', { title: 'Home' });
        }
        modelMongo.close();
    })
})

module.exports = router;
