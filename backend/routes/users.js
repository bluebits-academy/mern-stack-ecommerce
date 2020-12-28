const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.post('/', async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(404).send('the user already exist');
    }

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    });
    user = await user.save();
    if (!user) return res.status(404).send('The user cannot be created');

    res.send(user);
});

router.put('/:id', async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let passwordHash = '';
    if (req.body.password != '') {
        passwordHash = bcrypt.hashSync(req.body.password, 10);
    } else {
        passwordHash = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: passwordHash,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            city: req.body.city,
            country: req.body.country,
            zip: req.body.zip,
            apartment: req.body.apartment,
            street: req.body.street
        },
        { new: true }
    );

    if (!user)
        return res
            .status(404)
            .send('The user with the given ID was not found.');

    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user)
        return res
            .status(404)
            .send('The user with the given ID was not found.');

    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user)
        return res
            .status(404)
            .send('The user with the given ID was not found.');
    user.passwordHash = '';
    res.send(user);
});

router.post('/register', async (req, res) => {
    if (await User.findOne({ email: req.body.email })) {
        return res.status(404).send('the user already exist');
    }

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    });
    user = await user.save();

    res.send(user);
});

router.post('/login', async (req, res) => {
    const secret = process.env.secret;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            { sub: user._id, isAdmin: user.isAdmin },
            secret,
            { expiresIn: '1d' }
        );
        res.send({
            user: user.email,
            token: token,
        });
    } else {
        return res.status(404).send({ message: 'wrong password' });
    }
});

router.get('/get/count', async (req, res) => {
    const usersCount = await User.countDocuments((count) => count);
    if (!usersCount) {
        return res.status(404).send('The user not found');
    }
    res.send({
        userCount: usersCount,
    });
});


module.exports = router;
