import { EErrors } from "../../services/errors/enums.js";

const errorHandler = () => (error, req, res, next) => {
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            return res.send({status: 'error', error: error.name})            
            break;
        
        case EErrors.SESSION_ERROR:
            return res.send({status: 'error', error: error.name})            
            break;
        
        case EErrors.INVALID_TYPES_ERROR:
            return res.send({status: 'error', error: error.name})            
            break;
            
        default:
            return res.send({status: 'error', error: 'Unhandled error'})
            break;
    }
    next()
}

export default errorHandler
