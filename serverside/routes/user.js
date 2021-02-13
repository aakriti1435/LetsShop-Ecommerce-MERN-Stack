import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/signIn', (req, res) => {});

router.post('/signUp', (req, res) => {
    User.findOne({ email: req.body.email}).exec((error, user) => {
        if(user) {
            return res.status(400).json({ message: 'User Already Exists!' })
        };

        const { firstName, lastName, email, password } = req.body;
        const _user = new User({ firstName, lastName, email, password, username: Math.random().toString() });

        _user.save((error, data) => {
            if(error) {
                console.log(error);
                return res.status(400).json({
                    message: 'Something Went Wrong'
                });
            }
            if(data) {
                return res.status(201).json({
                    user: data
                })
            }
        });
    })
});

export default router;