import connect from './mongo/monogo';
import User from "../api/mongodb";
connect().then(r => console.log(r));

export default async function register(req, res) {

    if (req.method === 'POST') {
        try {
            const { email, password, name, dateOfBirth } = req.body;
const user = new User({ email, password, name, dateOfBirth });
            await user.save();
            res.status(200).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to register user' });
        }
    } else if (req.method === 'GET') {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to get users' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}