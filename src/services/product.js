//import CustomError from "../services/errors/CustomError.js";
//import { EErrors } from "../services/errors/enums.js";
export default class ProductService {
    constructor(dao){
        this.dao = dao
    }

    async getProducts(limit, page, query, sort){
        try {
            return await this.dao.get(limit, page, query, sort)            
        } catch (error) {
            return error
        }
    }

    async getProduct(pid){
        try {
            return await this.dao.getById(pid)
        } catch (error) {
            return error
        }
    }
    
    async createProduct(newProduct){
        try {            
            return await this.dao.create(newProduct)                         
        } catch (error) {
            return error
            // CustomError.createError({
            //     name: "Product not created",
            //     cause: createProductErrorInfo({
            //       title : product.title, 
            //       description : product.description,
            //       code: product.code,
            //       price: product.price,
            //       stock: product.stock,
            //       category: product.category
            //     }),
            //     message: "Error in creating a product",
            //     code: EErrors.INVALID_TYPES_ERROR
            //   })
        }
    }

    async updateProduct(pid, updateProduct){
        try {
            return await this.dao.update(pid, updateProduct)
        } catch (error) {
            return error
        }
    } 

    async deleteProduct(pid){
        try {
            return await this.dao.delete(pid)
        } catch (error) {
            return error
        }
    }    
}