import { Schema, model } from 'mongoose'
import pkg from 'mongoose-paginate-v2';

const userCollection = 'usuarios'

const UserSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required:true
    },
    cartId: {
        type: String,
    },
    lastConnection: {
        type: Date
    }
})

UserSchema.plugin(pkg)

let UserModel = model(userCollection, UserSchema)

export default UserModel
