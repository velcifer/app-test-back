
const express = require('express');
const morgan = require('morgan');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const database = require('./databese');
const fetch = require('fetch');

var user = require('./config');


const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api", (req , res) => {
    res.json({
        mensaje: "Trabajando con  ( Nodejs and JWT )"
    });
});

app.get("/api/new",(req , res) => {
    (async () => {
        try {
        const res = await fetch('https://api.test.cambioseguro.com/api/v1.1/config/rates');
    
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
    
        const user = await res.json();
    
        console.log(user);
        } catch (err) {
        console.error(err);
        }
    })();
});




//Metodo login user 
app.post("/api/login", (req , res) => {
    const user = {
        "nombre" : "Julio",
        "email": "julio@gmail.com",
        "password": "123456789",
        "purchase_price": "3.68",
        "sale_price": "3.816"
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '10h'}, (err, token) => {
        res.json({
            token
        });
    });

});


//Metodo que ferifica el token con JWT
app.post("/api/posts", verifyToken, (req , res) => {

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                    mensaje: "Post fue creado",
                    authData
                });
        }
    });
});



//Metodo Crear nuevo
app.post('/api/create', (req, res) => {
    console.log(req.body);
    const id = user.length + 1;
    const { nombre, 
            email,
            password,
            purchase_price,
            sale_price
            } = req.body;
    const newuser = { ...req.body, id };
    if (id && nombre && email && password && purchase_price && sale_price) {
        user.create(newuser);
        res.json(user);
    } else {
        res.status(500).json({error: 'Hubo un error.'});
    }
});

//Metodo Actualizar
app.put('/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let { name, email, password, purchase_price, sale_price} = req.body;
        let response = await db.user.update(
            {name, email, password, purchase_price, sale_price},
            {
                where: {
                    id,
                },
            }
            
        );
        }catch(err){
            res.status(400).send('No se pudo actualizar');

        }

});

//Metodo eliminar por id.
app.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(user, (user, i) => {
            if (user.id == id) {
                user.splice(i, 1);
            }
        });
        res.json(user);
    }
});


// Authorization: Bearer <token>
function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token  = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000);
console.log('Servidor iniciado', 3000);