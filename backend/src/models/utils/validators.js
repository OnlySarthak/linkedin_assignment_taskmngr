import User from '../user.model.js';
import Task from '../task.model.js';

const validateLoginData = (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }

        //email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        //password
        if (typeof password !== 'string' || password.length < 6) {
            throw new Error('Password must be a string with at least 6 characters');
        }
    } catch (error) {
        throw error;
    }
};

const validateRegisterData = async (email, password, username) => {
    try {
        if (!email || !password || !username) {
            throw new Error('All fields are required');
        }

        //username
        if (typeof username !== 'string' || username.length < 3) {
            throw new Error('Username must be a string with at least 3 characters');
        }

        //email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        //password
        if (typeof password !== 'string' || password.length < 6) {
            throw new Error('Password must be a string with at least 6 characters');
        }
    } catch (error) {
        throw error;
    }
};

const validateUpdateTaskData = async ({ title, status, taskId }) => {
    const savedTask = await Task.findById(taskId);
    if (!savedTask) {
        throw new Error('Task not found');
    }
    
    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            throw new Error('Title must be a non-empty string');
        }
    }
    if (status !== undefined) {
        if (!['pending', 'in-progress', 'completed'].includes(status)) {
            throw new Error('Invalid task status');
        }
    }
};

export {
    validateLoginData,
    validateRegisterData,
    validateUpdateTaskData
};