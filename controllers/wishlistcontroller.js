const router = require('express').Router();
const Wishlist = require('../models/wishlist');
const validateSession = require('../middleware/validateSession');

const multer = require('multer');
// const path = require('path');

const multerS3 = require('multer-s3');
// const fs = require('fs');
const aws = require('aws-sdk');

let s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
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

// ******************** (POST) Create a wishlist ******************** //
router.post('/upload', validateSession, upload.single('image'), (req, res) => {
    Wishlist.create({
        image: req.file.location,
        comment: req.body.comment,
        userId: req.user.id
    })
        .then(wishlists => res.status(200).json({wishlists}))
        .catch(err => {
            res.status(500).json({error: err})
            console.log(err);
        });
});

// ******************** (GET) Get all wishlists ******************** //
router.get('/allwishlist', (req, res)=>{
    
    Wishlist.findAll({
        where: {userId: req.user.id}
    })
    .then(wishlists => res.status(200).json({
        wishlists: wishlists,
        message: 'Wishlist Retrieved'
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
});

// ******************** (PUT) Update wishlist ******************** //
router.put("/update/:id", validateSession, upload.single('image'), function (req, res) {
    const updateWishlist = {
        image: req.file.location,
        comment: req.body.comment,
        userId: req.user.id
    };

    const query = { where: { id: req.params.id, userId: req.user.id } };

    Wishlist.update(updateWishlist, query)
    .then((wishlists) => res.status(200).json(wishlists))
    .catch((err) => res.status(500).json({ error: err })); 

});

// ******************** (DELETE) Delete a wishlist ******************** //
router.delete("/delete/:id", validateSession, upload.single('image'), (req, res) => {
    Wishlist.destroy({
        where: { id: req.params.id, userId: req.user.id }
    })
    .then(wishlists => res.status(200).json(wishlists))
    .catch(err => res.json({error: err}))
})

module.exports = router;