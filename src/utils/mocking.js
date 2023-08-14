import {faker} from "@faker-js/faker";
faker.locale = 'en';
export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
        code: faker.datatype.string(10),
        stock: faker.random.numeric(2),
        category: faker.commerce.department()
    }
}