import { Schema, model } from 'mongoose'

const messageCollection = 'messages'
const MessageSchema = new Schema({    
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    }
})

const MessageModel = model(messageCollection, MessageSchema)

export default MessageModel