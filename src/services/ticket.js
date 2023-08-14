import { productService } from "./index.js";

export default class TicketService {
    constructor (TicketDao){
        this.ticketDao = TicketDao
    }
    async getTickets(){
        try {
            return await this.ticketDao.get()
        } catch (error) {
            console.log(error);
        }
    }

    async getTicket(tid){
        try {
            return await this.ticketDao.getById(tid)
        } catch (error) {
            console.log(error);
        }
    }
    async createTicket(cart, purchaser){
        try {
            let amount = 0
            cart.products.forEach( async (element) => {
                let product = await productService.getProduct(element.productId)
                amount += (element.quantity * product.price)
            });
            return await this.ticketDao.create({
                purchase_datetime: new Date(),
                amount: amount,
                purchaser: purchaser.toString(),
                cart: cart
            })
        } catch (error) {
            console.log(error);
        }
    }
    // async updateTicket(){
    //     return await this.ticketDao.update()
    // }
    async deleteTicket(tid){
        try {
            return await this.ticketDao.delete(tid)
        } catch (error) {
            console.log(error);
        }
    }
}