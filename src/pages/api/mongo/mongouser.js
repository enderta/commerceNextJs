import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import connect from './monogo.js';
import bcrypt from "bcrypt";
import autoIncrement from 'mongoose-auto-increment';

const secret = 'your_secret_key_here';

// Connect to the MongoDB instance



// Define a new schema for the User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

// Add the auto-incrementing plugin to the userSchema
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id',
    startAt: 1,
});

// Check if the User model has already been defined
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req, res) {
    const { method, body: { username, password, email, role } } = req;
    if (method === "POST") {
        try {
            await check('username', 'Please enter a username').not().isEmpty().run(req);
            await check('email', 'Please include a valid email').isEmail().run(req);
            await check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}).run(req);
            await check('role', 'Please enter a role').not().isEmpty().run(req);

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Fill in all fields'});
            }

            const result = await User.findOne({email: email});
            if (result) {
                return res.status(400).json({message: 'User already exists'});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                username,
                email,
                password: hashedPassword,
                role,
            });

            const savedUser = await user.save();
            res.status(201).json({
                message: 'User created',
                data: {
                    email,
                    password,
                    username,
                    role,
                    userId: savedUser._id,
                },
            });
        } catch (err) {
            console.error(err);
        }
    }
}
