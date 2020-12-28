const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const e = require('express');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.split(' ').join('-');
        const extention = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extention}`);
    },
});

const uploadOptions = multer({ storage: multerStorage });

router.get('/', async (req, res) => {
    let filters = {};
    if(req.query.categories) {
        filters = {category: req.query.categories.split(',')};
    }
    const products = await Product.find(filters).populate('category').sort('name');
    res.send(products);
});

router.post('/', uploadOptions.single('image'), async (req, res, next) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid category.');

    const basePath = `${req.protocol}://${req.get('host')}`;
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}/public/uploads/${req.file.filename}`,
        brand: req.body.brand,
        price: req.body.price,
        category: {
            _id: category._id,
        },
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });

    product = await product.save().then((createdProduct) => {
        res.status(201).json({
            ...createdProduct,
            id: createdProduct._id,
        });
    });

    res.send(product);
});

router.put('/:id', uploadOptions.single('image'), async (req, res, next) => {
    console.log(req.body);
    const category = await Category.findById(req.body.category);
    const productOrigin = await Product.findById(req.params.id);
    if (!category) return res.status(400).send('Invalid category.');

    const basePath = `${req.protocol}://${req.get('host')}`;
    const file = req.file;
    let imagePath = '';
    if (file) {
        imagePath = `${basePath}/public/uploads/${req.file.filename}`;
    } else {
        imagePath = productOrigin.image;
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: imagePath,
            brand: req.body.brand,
            price: req.body.price,
            category: {
                _id: category._id,
            },
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    );

    if (!product)
        return res
            .status(404)
            .send('The product with the given ID was not found.');

    res.send(product);
});

router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product)
        return res
            .status(404)
            .send('The product with the given ID was not found.');

    res.send({ success: true });
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product)
        return res
            .status(404)
            .send('The product with the given ID was not found.');

    res.send(product);
});

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments((count) => count);
    if (!productCount) {
        return res.status(404).send('The products not found');
    }
    res.send({
        productCount: productCount,
    });
});

router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);
    if (!products) {
        return res.status(404).send('The products not found');
    }
    res.send(products);
});

router.post(
    '/gallery-images/:id',
    uploadOptions.array('gallery_images', 10),
    async (req, res, next) => {
        const productOrigin = await Product.findById(req.params.id);
        if (!productOrigin) return res.status(400).send('Invalid product.');

        const basePath = `${req.protocol}://${req.get('host')}`;
        const files = req.files;

        let imagePaths = [];
        if (files) {
            files.map((file) => {
                imagePaths.push(`${basePath}/public/uploads/${file.filename}`);
            });
        } else {
            console('no files');
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagePaths,
            },
            { new: true }
        );

        if (!product)
            return res
                .status(404)
                .send('The product with the given ID was not found.');

        res.send(product);
    }
);

module.exports = router;
