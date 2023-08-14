export default class UserDTO {
    constructor(newUser){
        this.first_name = newUser.first_name
        this.last_name  = newUser.last_name
        this.email      = newUser.email
        this.password   = newUser.password
    }
}
