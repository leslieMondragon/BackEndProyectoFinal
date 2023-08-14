import { productService } from "./index.js";

export default class CartService {
    constructor (CartDao){
        this.cartDao = CartDao
    }
    async create(){
        try {
            return await this.cartDao.create()
        } catch (error) {
            console.log(error);
        }
    }
    async getCart(cid){
        try {
            return await this.cartDao.getById(cid)
        } catch (error) {
            console.log(error);
        }
    }
    async addProduct(cid, pid){
        try {
            return await this.cartDao.addProduct(cid, pid)
        } catch (error) {
            console.log(error);
        }
    }
    async addProductQuantity(cid, pid, quantity){
        try {
            return await this.cartDao.addProductQuantity(cid, pid)
        } catch (error) {
            console.log(error);
        }
    }
    async addProducts(cid, array){
        try {
            return await this.cartDao.addProducts(cid, array)
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(cid, pid){
        try {
            return await this.cartDao.deleteProduct(cid, pid)
        } catch (error) {
            console.log(error);
        }
    }
    async deleteCart(cid){
        try {
            return await this.cartDao.deleteCart(cid)
        } catch (error) {
            console.log(error);
        }
    }
    async finishProcess(cart){
        try {
            cart.products.forEach(async (element) => {
                let product = await productService.getProduct(element.productId)
                if (product.stock >= element.quantity) {
                    let newStock = product.stock - element.quantity
                    product.stock = newStock
                    return await productService.updateProduct(element.productId, product)
                }
                else {
                    console.log("NO STOCK");
                    return await this.cartDao.deleteProduct(cart._id.toString(), product._id.toString())
                }
            });
        } catch (error) {
            console.log(error);
        }
        return await this.cartDao.getById(cart._id.toString())
    }
}