import TicketModel from "../../models/ticket.js"

export default class TicketManager {
    constructor(){
        this.ticketModel = TicketModel
    }

    async get(){
        try {
            return await this.ticketModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }

    async getById(tid){
        try {
            return await this.ticketModel.findById(tid)
        } catch (error) {
            new Error(error)
        }
    }

    async create(newTicket){
        try {
            return await this.ticketModel.create(newTicket)
        } catch (error) {
            console.log(error);
        }
    }   

    // async update(){
    //     try {
    //         return await 
    //     } catch (error) {
    //         new Error(error)
    //     }
    // }

    async delete(tid){
        try {
            return await this.ticketModel.findByIdAndDelete(tid)
        } catch (error) {
            new Error(error)
        }
    }
}