import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    dateOfBirth: Date,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;