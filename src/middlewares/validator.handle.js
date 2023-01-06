const boom = require('@hapi/boom');

const validatorHandler = (schema, property) => {
    
    return ( req, res, next ) => {
        const data = req[property];
        /*AbortEarly - Funciona para que retorne todos 
        los errores y no se detenga en el primero */
        const { error } = schema.validate(data, { abortEarly: false });
        
        if(error){
            next(boom.badRequest(error));
        }
        next();
    }
};

module.exports = validatorHandler;