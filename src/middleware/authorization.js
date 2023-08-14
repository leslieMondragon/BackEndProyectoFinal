const authorization = (role) => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).json({status: 'error', error: 'Unauthorized'})
        if(req.user.role!==role || req.user.role !=="admin") return res.status(403).json({status: 'error', error: 'No permissions'})
        req.logger.info('role: ', role)
        req.logger.info('user: ', req.user.role)
        next()
    }
}
export default authorization
