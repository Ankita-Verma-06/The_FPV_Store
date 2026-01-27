const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decodedData?.id, role: decodedData?.role };
            req.userId = decodedData?.id;
            req.userRole = decodedData?.role;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthenticated' });
    }
};

const admin = (req, res, next) => {
    console.log(`Admin check for user: ${req.user?.id}, role: ${req.user?.role}`);
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        console.log(`Access denied for role: ${req.user?.role}`);
        res.status(403).json({ message: 'Access denied: Admin role required' });
    }
};

module.exports = { protect, admin };
