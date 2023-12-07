const express = require('express');

const router = express.Router();
const { auth } = require('../middleware/auth');
const Product = require('../models/Product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req,file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload =  multer({storage : storage}).single('file')

router.post('/image', auth ,async (req,res,next) => {
    upload(req,res,err => {
        if(err) {
            return res.status(500).send(err);
        }
        return res.json({fileName: res.req.file.filename})
    })
})

router.get('/' ,async (req,res,next) => {
    const order = req.query.order ? req.query.order : 'desc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0;

    try {
        const products = await Product.find()
        .populate('writer')
        .sort([[ order ]])
        .skip(skip)
        .limit(limit)

        const productsTotal = await Product.countDocuments();
        const hasMore = skip+limit< productsTotal ? true : false;

        return res.status(200).json({
            products,
            hasMore
        })
    } catch(error) {
        next(error);
    }
})


router.post('/', auth ,async (req,res,next) => {
    try {
        const product = new Product(req.body);
        product.save();
        return res.sendStatus(201);
    } catch(error) {
        next(error);
    }
})


module.exports = router;