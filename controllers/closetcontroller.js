const router = require('express').Router();
const Closet = require('../models/closet');
const validateSession = require('../middleware/validateSession');

const multer = require('multer');
const path = require('path');

const multerS3 = require('multer-s3');
const fs = require('fs');
const aws = require('aws-sdk');

let s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKET
});

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'stylistappbucketlb',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
});

router.post('/upload', validateSession, upload.single('image'), async (req, res) => {
    try {
        const {category} = req.body;

        let newCloset = await Closet.create({category, owner_id: req.user.id});

        res.status(200).json({
            closet: newCloset,
            message: "Success!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create post."
        })
    }
});

module.exports = router;