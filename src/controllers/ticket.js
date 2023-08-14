import { ticketService, userService } from "../services";

class TicketController {
    async getTickets(req, res){
        try {
            let tickets = await ticketService.getTickets()
            tickets === undefined ? 
            res.status(400).send("no tickets"):
            res.status(200).send(tickets)
        } catch (error) {
            req.logger.error(error);
        }
    }
    async getTicket(req, res){
        try {
            const {tid} = req.params
            const ticket = await ticketService.getTicket(tid)
            ticket === undefined ? 
            res.status(400).send("no ticket"):
            res.status(200).send(ticket)
        } catch (error) {
            req.logger.error(error);
        }
    }
    async createTicket(req, res){
        try {
            const {body} = req
            const resp = await ticketService.createTicket(body)
            resp === undefined ? 
            res.status(400).send("no created"):
            res.status(200).send(resp)
            // const {user, cid} = req.body
            // const resultUser = await userService.getUser(user)
            // const resultCart = await 

        } catch (error) {
            req.logger.error(error);
        }
    }
    // async updateTicket(req, res){
        
    // }
    async deleteTicket(req, res){
        try {
            const {tid} = req.params
            const deleted = await ticketService.deleteTicket(tid)
            deleted === undefined ? 
            res.status(400).send("no deleted"):
            res.status(200).send(deleted)
        } catch (error) {
            req.logger.error(error);
        }
    }
}