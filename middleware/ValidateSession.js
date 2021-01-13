const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateSession = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next(); 
    } else {
        let sessionToken = req.headers.authorization;
        console.log(sessionToken);
        if (!sessionToken) {
            res.status(403).send({ auth: false, message: "No token provided" });
        } else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                console.log(decoded)
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.user = user;
                        console.log(`user: ${user}`)
                        next()
                    },
                        () => {
                            res.status(401).send({
                                error: "Not authorized"
                            });
                        })
                } else {
                    res.status(400).send({ error: "Really not authorized" })
                }
            })
        }
    }
}

module.exports = validateSession;

        // const jwt = require('jsonwebtoken');
        // const { User } = require('../models');

        // const validateSession = (req, res, next) => {
        //     if (req.method === "OPTIONS") {
        //         return next();
        //     } else if (req.headers.authorization) {
        //         const { authorization } = req.headers;
        //         const payload = authorization
        //             ? jwt.verify(authorization, process.env.JWT_SECRET)
        //             : undefined;
        //         console.log(authorization);
        //         console.log(payload);
        //         if (payload) {
        //             User.findOne({
        //                 where: { id: payload.id },
        //             }).then((user) => {
        //                 req.user = user;
        //                 next();
        //             });
        //         } else {
        //             res.status(401).json({
        //                 message: "Not authorized",
        //             });
        //         }
        //     } else {
        //         res.status(401).json({
        //             message: "Not allowed.",
        //         });
        //     }
        // };

        // const jwt = require("jsonwebtoken");
        // const { User } = require("../models");
        // const { model } = require("../db");

        // const validateSession = (req, res, next) => {
        //     if (req.method === "OPTIONS") {
        //         return next();
        //     } else if (req.headers.authorization) {
        //         const { authorization } = req.headers;
        //         const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;
        //         console.log(payload);

        //         if (payload) {
        //             User.findOne({
        //                 where: { id: payload.id }
        //             })
        //                 .then(user => {
        //                     console.log("REQUEST BEFORE", req.user)
        //                     req.user = user;
        //                     console.log("REQUEST AFTER", req.user)
        //                     next()
        //                 })
        //         } else {
        //             res.status(401).json({
        //                 message: "Not Authorized."
        //             })
        //         }
        //     } else {
        //         res.status(401).json({
        //             message: "Not allowed."
        //         })
        //     }
        // }

        // module.exports = validateSession;