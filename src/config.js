var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    user: {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        purchase_price: {
            type: String,
            required: true
        },
        sale_price: {
            type: String,
            required: true
        }



        
    },
        
});

//crear schema deacuerdo al modelo
var user = mongoose.model('user', userSchema);


module.exports =user;
