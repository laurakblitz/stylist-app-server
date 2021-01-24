const router = require('express').Router();
const Closet = require('../models/closet');
const validateSession = require('../middleware/ValidateSession');

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

let s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    // region: process.env.REGION,
    bucket: process.env.BUCKET
});

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'stylistappbucketlb',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
});

// ******************** (POST) Create a closet post ******************** //
router.post('/upload', validateSession, upload.single('image'), (req, res) => {
    Closet.create({
        image: req.file.location,
        category: req.body.category,
        userId: req.user.id
    })
        .then(closets => res.status(200).json({ closets }))
        .catch(err => {
            res.status(500).json({ error: err })
            console.log(err);
        });
});

// ******************** (GET) Get all closet posts ******************** //
router.get('/allcloset', validateSession, (req, res) => {

    Closet.findAll({
        where: { userId: req.user.id }
    })
        .then(closets => res.status(200).json({
            closets: closets,
            message: 'All Closet Posts Retrieved'
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
});

// ******************** (PUT) Update closet post ******************** //
router.put('/update/:id', validateSession, upload.single('image'), function (req, res) {
    
    const updateCloset = {
        image: req.file.location,
        category: req.body.category,
        userId: req.user.id
    };

    const query = { where: { id: req.params.id, userId: req.user.id } };

    Closet.update(updateCloset, query)
        .then((closets) => res.status(200).json(closets))
        .catch((err) => res.status(500).json({ error: err }));
});

// ******************** (DELETE) Delete closet post ******************** //
router.delete('/delete/:id', validateSession, upload.single('image'), (req, res) => {

        Closet.destroy({
            where: { id: req.params.id, userId: req.user.id }
        })
            .then(closets => res.status(200).json(closets))
            .catch(err => res.json({ error: err }))
});

module.exports = router;