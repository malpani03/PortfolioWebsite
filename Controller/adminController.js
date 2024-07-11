const jwt = require('jsonwebtoken');

const adminEmail =process.env.ADMIN_USER;
const adminPassword =process.env.ADMIN_PASS;

const adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (email === adminEmail && password === adminPassword) {
        const token = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { adminLogin };
