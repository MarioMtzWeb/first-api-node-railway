const { faker } = require('@faker-js/faker');

const products = [];

for(let i = 0; i < 1000; i++) {
    products.push({
        id:  faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl(),
    });
}


const users = [];

for(let i = 0; i < 1000; i++) {
    users.push({
        id:  faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        job: faker.name.jobType(),
    });
}


module.exports = {
    products,
    users,
};