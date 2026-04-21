"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                error: 'User already exists with this email'
            });
            return;
        }
        // Create new user
        const user = await User_1.default.create({
            name,
            email,
            password,
            role: role || 'user'
        });
        // Generate token
        const token = (0, jwt_1.generateToken)(user);
        // Remove password from response
        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            // createdAt: user.createdAt,
            // updatedAt: user.updatedAt
        };
        res.status(201).json({
            success: true,
            data: {
                user: userWithoutPassword,
                token
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server error during registration'
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user and include password
        const user = await User_1.default.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
            return;
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
            return;
        }
        // Generate token
        const token = (0, jwt_1.generateToken)(user);
        // Remove password from response
        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            // createdAt: user.createdAt,
            // updatedAt: user.updatedAt
        };
        res.status(200).json({
            success: true,
            data: {
                user: userWithoutPassword,
                token
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server error during login'
        });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const userWithoutPassword = {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            // createdAt: req.user!.createdAt,
            // updatedAt: req.user!.updatedAt
        };
        res.status(200).json({
            success: true,
            data: userWithoutPassword
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server error fetching profile'
        });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=authController.js.map