let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/orangeservice');

mongoose.connection.on('error',(err)=>{
    console.log(err);
});

module.exports = {
    mongoose:mongoose
}