import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';

export const signIn = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async(error, user) => {
        if (error) {
            return res.status(400).json({ error });
        };

        if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (isPassword && user.role === 'admin') {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    }
                })
            } else {
                return res.status(400).json({ message: "Invalid Password" })
            }
        } else {
            return res.status(400).json({ message: "Something Went Wrong" })
        }
    });
};

export const signUp = async(req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user) {
            return res.status(400).json({ message: 'Admin Already Exists!' })
        };

        const { firstName, lastName, email, password } = req.body;
        const _user = new User({ firstName, lastName, email, password, username: shortid.generate(), role: 'admin' });

        _user.save((error, data) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: 'Something Went Wrong'
                });
            }
            if (data) {
                return res.status(201).json({
                    message: 'Admin Created Successfully'
                })
            }
        });
    });
};

export const requireSignIn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
};