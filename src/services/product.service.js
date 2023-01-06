//Data
const { faker } = require('@faker-js/faker');
const { products } = require('../data');

//Boom
const boom = require('@hapi/boom');

class ProductsService {
    constructor(){
        this.productos = [];
        this.generate();
    }

    async generate(){

        const limit = 100;
        const newProducts = [];

        for(let i = 0; i < limit; i++) {
            newProducts.push(products[i]);
        }
        
        this.productos = [...newProducts];

    }

    async create( data ){

        const { name, price } = data;

        const newProduct = {
            id: faker.datatype.uuid(),
            image: faker.image.imageUrl(),
            name,
            price,
        };

        this.productos.push(newProduct);

        return newProduct;
    }

    async find(){
        return this.productos;
    }

    async findOne ( id ){

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                const product = this.productos.find(product => product.id === id);

                if(product !== undefined){
                    resolve(product);
                } else {
                    reject(boom.notFound("Product not found"));
                }
            }, 5000);
        })
    }

    async update( { id, changes } ){

        return new Promise((resolve, reject) => {
            
            const index = this.productos.findIndex(product => product.id === id);
            
            if(index === -1){
                reject(boom.notFound("Product not found"));
            }

            const product = this.productos[index];
            this.productos[index] = {
                ...product,
                ...changes,
            };

            resolve(this.productos[index]);
        });

    }

    async delete( id ){

        const index = this.productos.findIndex(product => product.id === id);
        
        if(index === -1){

            throw new Error('Product not found');
        }

        this.productos.splice(index,1);

        return { isDeleted: true };
    }
}

module.exports = ProductsService;