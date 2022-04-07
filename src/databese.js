var mongoose = require('mongoose');
var user = require('./config');

mongoose.connect('mongodb://localhost/test-backend', function (err) {

    if (err) throw err;

    console.log('Estas conectado a MongoDB');

   //Create User Obiect
var userObject = new user ({
	user: {
        nombre : "Julio",
        email: "julio@gmail.com",
        password: "123456789",
        purchase_price: "3.68",
        sale_price: "3.816",
    }
});


   //Guada el documento de usuario en la tabla.
    userObject.save(function(err){
	if (err) throw err;
})

   //Encuentre a todos los usuarios en la tabla o collection
    user.find({}, function(err, dbUser){
	if (err) throw err;
	console.log(JSON.stringify(dbUser));
});

});
