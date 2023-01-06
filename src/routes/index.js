const express = require('express');

const productsRouter = require('../controllers/products.routes');
const usersRouter = require('../controllers/users.routes');

const routerApi = (app) => {

    //Manejamos una ruta padre para el manejo de las rutas
    const router = express.Router();
    app.use('/api/v1', router);
    
    router.use('/productos', productsRouter);
    router.use('/users', usersRouter);
};

module.exports = routerApi;