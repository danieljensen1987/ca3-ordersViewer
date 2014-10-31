var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String
});

exports.CategoryModel = mongoose.model('categories', CategorySchema);

var ProductSchema = mongoose.Schema({
    _id: Number,
    name: String,
    category: { type: Number, ref: 'categories' },
    quantityPerUnit: String,
    unitPrice: Number,
    unitsInStock: Number,
    unitsOnOrder: Number,
    reorderLevel: Number,
    discontinued: Number
});

exports.ProductModel = mongoose.model('products', ProductSchema);

var DetailsSchema = mongoose.Schema({
    order: { type: Number, ref: 'orders' },
    product: { type: Number, ref: 'products' },
    unitPrice: Number,
    quantity: Number,
    discount: Number
});

exports.DetailsModel = mongoose.model('orderdetails', DetailsSchema);


var CustomerSchema = mongoose.Schema({
    _id: String,
    companyName: String,
    contactName: String,
    contactTitle: String,
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    phone: String,
    fax: String
});

exports.CustomerModel = mongoose.model('customers', CustomerSchema);

var EmployeeSchema = mongoose.Schema({
    _id: Number,
    lastName: String,
    firstName: String,
    title: String,
    titleOfCourtesy: String,
    birthDate: String,
    hireDate: String,
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    homePhone: String,
    extension: String,
    notes: String
});

exports.EmployeeModel = mongoose.model('employees', EmployeeSchema);

var OrderSchema = mongoose.Schema({
    _id: Number,
    customer: { type: String, ref: 'customers' },
    employee: { type: Number, ref: 'employees' },
    orderDate: String,
    requiredDate: String,
    shippedDate: String,
    shipVia: String,
    freight: Number,
    shipName: String,
    shipAddress: String,
    shipCity: String,
    shipRegion: String,
    shipPostalCode: String,
    shipCountry: String
});

exports.OrderModel = mongoose.model('orders', OrderSchema);
