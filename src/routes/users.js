const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res,next) => {

    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch(error) {
        next(error);
    }
})

router.post('/login', async (req,res,next) => {
    
    try {
        const user = await User.findOne({email:req.body.email});

        if(!user) {
            return res.status(400).send('Auth faild, email not found');
        }

        const isMatch = await user.comparePassword(req.body.password);
        if(!isMatch) {
            return res.status(400).send('Wrong password');
        }

        const payload = {
            userId: user._id.toHexString(),
        }

        //token 생성
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})

        return res.json({user:user, accessToken:accessToken})
    } catch(error) {
        next(error);
    }
})


module.exports = router;