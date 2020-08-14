const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    let token = req.header('x-auth-token') || req.headers['Authorization'];
    
    if(!token) return res.status(401).send('Access denied. No token detected');
    try {
        const decoded = jwt.verify(token, process.env.jwtSecretKey);
        req.user = decoded;
        next();
    }catch(ex){
        res.status(400).send('JWT token has expired.Invalid token')
    }
    
}

