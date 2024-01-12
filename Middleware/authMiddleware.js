const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const requireAuth = async (req, resp, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.secret_key, async (error, decodedToken) => {
            if (error) {
                resp.status(400).json({  // Corrected the syntax here
                    success: false,
                    message: "Please Login first"
                });
                resp.redirect('/userLogin');
            } else if (decodedToken) {
                let user = await User.findById(decodedToken.userId);
                req.userData = user;
                next();
            }
        });
    } else {
        resp.status(400).json({
            success: false,
            message: "Please Login first"
        });
    }
};

const checkUser = async (req, resp, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.secret_key, async (error, decodedToken) => {
            if (error) {
                resp.redirect('/login');
            } else if (decodedToken) {
                let user = await User.findById(decodedToken.userId);
                req.userData = user;
                next();
            }
        });
    }
};

const checkAdmin = (req, resp, next) => {
    if (req.userData && req.userData.role === 'admin') {
        next();
    } else {
        resp.status(403).json({
            success: false,
            message: 'Permission denied. Admin access required.',
        });
    }
};

module.exports = { requireAuth, checkUser, checkAdmin };
