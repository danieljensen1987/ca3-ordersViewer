var express = require('express');
var router = express.Router();
var model = require('../database/model');
var modelMongo = require('../database/modelMongo');

function sortById(a, b) {
    return a._id - b._id;
}

router.get('/', function(req, res) {
    modelMongo.connect();
    model.CategoryModel.find({}, function (err, categories) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            res.render('categories', { categories: categories.sort(), title: 'Categories' });
        }
        modelMongo.close();
    })
});

router.get('/:categoryId', function (req, res) {
    var categoryId = req.params.categoryId;
    modelMongo.connect();
    model.ProductModel.find({category: categoryId}, function (err, products) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            res.render('category', { products: products.sort(sortById), title: 'Category ' + categoryId});
        }
        modelMongo.close();
    });
});

module.exports = router;
