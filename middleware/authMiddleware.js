const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    console.log('Authorization Header:', authorizationHeader);  // Debug log

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const token = authorizationHeader.split(' ')[1];
    console.log('Extracted Token:', token);  // Debug log

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        console.log('Decoded Token:', decoded);  // Debug log
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
