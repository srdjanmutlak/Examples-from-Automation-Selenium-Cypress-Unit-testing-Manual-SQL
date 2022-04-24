const faker = require('faker');
export class RandomData {
    constructor() {
        this.randomData = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.random.number(),
            projectName: faker.commerce.productName(),
            projectDescription: faker.commerce.productDescription(),
            timeEntered: faker.datatype.number(),

        }
    }
}
export default (new RandomData);