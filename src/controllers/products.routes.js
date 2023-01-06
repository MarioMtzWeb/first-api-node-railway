//Express
const express = require('express');
const router = express.Router();

//Services
const ProductsService = require('../services/product.service');
const service = new ProductsService();

//Middlewares
const validatorHandle = require('../middlewares/validator.handle');

//Schemas
const { 
    createProductSchema, 
    updateProductSchema, 
    getProductSchema 
} = require('../schemas/product.schema');

router.get('/', async (req, res) => {

    const products = await service.find();
    res.json(products);
});

router.get('/:id',
    validatorHandle(getProductSchema, 'params'),  
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);

            res.status(201).json({
                body: product,
            });

        } catch(err){
            next(err);
        }
});

router.post("/", 
    validatorHandle(createProductSchema, 'body'),
    async (req, res) => {

        const body = req.body;

        const newItem = await service.create( body );
            
        res.status(201).json({
            message: "created",
            data: newItem,
        });
});

router.patch("/:id",
validatorHandle(getProductSchema, 'params'), 
validatorHandle(updateProductSchema, 'body'),
async (req, res, next) => {
    try {
        const { id } = req.params; 
        const body = req.body;
        const product = await service.update({ id, changes: body });

        
        res.status(201).json({
            message: "update",
            data: product,
        });
    } catch ( err ){

        next(err);
    }
});

router.delete("/:id", async (req, res) => {

    const { id } = req.params;
    
    const statusApi = service.delete( id );

    res.status(201).json({
        message: "deleted",
        body: statusApi,
    });
});

module.exports = router;