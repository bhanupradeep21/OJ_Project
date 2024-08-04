const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        res.staus(401).json({ message: 'Unauthorized' })
    }

    try{
        const decoded = jwt.verify(token,process.env.secretKey);
        req.user = decoded;
        next();

    }
    catch(err){
        res.status(400).json({message:'Invalid Token'})
    }
}


module.exports = {
    authentication
}