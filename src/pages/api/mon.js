import connect from './mongo/monogo';
import User from "../models/user";
connect();

export default async function register(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'We only support POST' });
    }
    else {
        const { email, password, name, dateOfBirth } = req.body;

        try {
            const user = new User({ email, password, name, dateOfBirth });

            await user.save();

            res.status(200).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to register user' });
        }
    }
}