const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Sem Token" });
    }

    try {
        const decoded = jwt.verify(token, "secretKey");
        req.userId = decoded.userId;
        req.admin = decoded.admin;
        next();
    } catch (error) {
        res.status(401).json({ error: "Usuário sem acesso" });
    }
};

module.exports = authUser;