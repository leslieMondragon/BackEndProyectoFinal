import UserModel from "../../models/user.js"
export default class UserManager {
    constructor(){
        this.userModel = UserModel
    }
    async get (params){
        try {
            if (params === undefined){
                return await this.userModel.find({}) 
            }
            else {
                return await this.userModel.find(params)
            }
        } catch (error) {
            return new Error(error)
        }
    }
    async getById(uid){
        try {
            return await this.userModel.findById(uid)
        } catch (error) {
            new Error(error)
        }
    }
    async getByEmail(email){
        try {
            return await this.userModel.findOne({email: email})
        } catch (error) {
            new Error(error)
        }
    }

    async create(newUser){
        try {
            return await this.userModel.create(newUser)
        } catch (error) {
            new Error(error)
        }
    }
    
    async update(uid, change){
        try {
            return await this.userModel.findByIdAndUpdate(uid, change)
        } catch (error) {
            new Error(error)
        }
    }

    async delete(uid){
        try {
            return await this.userModel.findByIdAndDelete(uid)
        } catch (error) {
            new Error(error)
        }
    }

    async changeRole(uid, role){
        try {
            return await this.userModel.findByIdAndUpdate(uid, {role: role})
        } catch (error) {
            new Error(error)
        }
    }
}