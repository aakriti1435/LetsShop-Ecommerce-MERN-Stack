import User from "../models/user.js";
import jwt from "jsonwebtoken";
import shortid from "shortid";
import bcrypt from "bcrypt";

export const signIn = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) {
            return res.status(400).json({ error });
        }

        if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (isPassword && user.role === "user") {
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName,
                } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName,
                    },
                });
            } else {
                return res.status(400).json({ message: "Invalid Password" });
            }
        } else {
            return res.status(400).json({ message: "Something Went Wrong" });
        }
    });
};

export const signUp = async (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user) {
            return res.status(400).json({ message: "User Already Exists!" });
        }

        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hashPassword,
            username: shortid.generate(),
        });

        _user.save((error, data) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: "Something Went Wrong",
                });
            }
            if (data) {
                return res.status(201).json({
                    message: "User Created Successfully",
                });
            }
        });
    });
};
