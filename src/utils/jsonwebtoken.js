import pkg from 'jsonwebtoken'
const { sign, verify } = pkg

const PRIVATE_KEY = 'coderSecret'


export const generateToken = (user) => {
    const token = sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

export const generateTokenMail = (user) => {
    const token = sign({user}, PRIVATE_KEY, {expiresIn: '1h'})
    return token
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(!authHeader){
        return res.status(401).json({status:'error',error: 'Not autenticated'})
    }
    const token = authHeader.split(' ')[1]

    verify(token, PRIVATE_KEY, (error, credential)=>{
        if(error){
            return res.status(403).json({status:'error',error: 'Not authorized'})
        }
        req.user = credential.user
        next()
    })
}

// export default {
//     PRIVATE_KEY,
//     generateToken,
//     authToken,
//     generateTokenMail
// }
