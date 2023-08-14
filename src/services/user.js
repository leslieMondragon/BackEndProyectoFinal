import UserDTO from "../dao/DTOs/user.js"
import { sendEmail } from "../utils/mailer.js";

export default class UserService {
    constructor (UserDao){
        this.userDao = UserDao
    }
    async getUsers(){
        try {
            return await this.userDao.get()
        } catch (error) {
            console.log(error);
        }
    }

    async getUserByEmail(email){
        try {
            return await this.userDao.getByEmail(email)
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(uid){
        try {
            return await this.userDao.getById(uid)
        } catch (error) {
            console.log(error);
        }
    }
    async createUser(newUser){
        try {
            let newUserNormalize = new UserDTO(newUser)
            let result = await this.userDao.create(newUserNormalize)
            return result            
        } catch (error) {
            return error
        }
    }
    
    async updateUser(uid, change){
        return await this.userDao.update(uid, change)
    }

    async deleteUser(uid){
        return await this.userDao.delete(uid)
    }

    async changeRole(uid, role){
        return await this.userDao.changeRole(uid, role)
    }

    async deleteUsers(){
        try {
            const users = await this.userDao.get({lastConnection: { $lt: Date.now() - 2 * 24 * 60 * 60 * 1000 }})
            users.forEach(async user => {
                const configSendMail = {
                    userMail: user.email,
                    subject: "Account closed",
                    html: `<div>
                        <h2>Your account has been deleted because of your inactivity</h2>
                      </div>`,
                  };
                  sendEmail(configSendMail);
                await this.userDao.delete(user._id.toString())
            });
            return users
        } catch (error) {
            return error;
        }
    }

    async updateConnection(uid){
        return await this.userDao.update(uid, {lastConnection: Date.now()})
    }
}