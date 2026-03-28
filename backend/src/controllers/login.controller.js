import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { validateLoginData, validateRegisterData } from '../models/utils/validators.js';
import backgroundTaskProccess from '../utils/backgroundTaskProccess.js';

const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        await validateRegisterData(email, password, username);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ username, email, password: hashedPassword });

        // start background tasks creation
        backgroundTaskProccess(newUser._id);

        res.status(201).json({ message: 'User registered successfully', user: { id: newUser._id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        await validateLoginData(email, password);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = user.generateToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
}

const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

export { register, login, logout };