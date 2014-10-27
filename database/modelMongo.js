var mongoose = require('mongoose');
//var dbURI = 'mongodb://localhost:27017';
var dbURI = 'mongodb://test:test@ds049180.mongolab.com:49180/ordersviewer';

module.exports.connect = function(){
//    mongoose.connect("mongodb://localhost/test");
    mongoose.connect(dbURI);

    var db = mongoose.connection;
    db.once('open', function(){
//        console.log('Connected ' + db.port);
        console.log('Connected ' + dbURI);
    });

    db.on('error', function (err) {
        console.log(err);
    });

};

module.exports.close = function(){
    mongoose.connection.close();
    console.log('Connection closed');
};