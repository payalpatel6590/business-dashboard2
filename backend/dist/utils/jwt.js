"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (user) => {
    const payload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role
    };
    const signOptions = {
        expiresIn: (process.env.JWT_EXPIRE || '30d')
    };
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET || 'fallback-secret-key', signOptions);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || 'fallback-secret-key');
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map