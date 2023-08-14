import { Schema, model } from 'mongoose'
import pkg from 'mongoose-paginate-v2';

const ticketCollection = 'tickets'

const TicketSchema = new Schema({
// code: String debe autogenerarse y ser único
// purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
// amount: Number, total de la compra.
// purchaser: String, contendrá el correo del usuario asociado al carrito.
    purchase_datetime: {
        type: Date
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    }
})

TicketSchema.plugin(pkg)
const TicketModel = model(ticketCollection, TicketSchema)

export default TicketModel