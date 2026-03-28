import Task from '../models/task.model.js';
import { validateUpdateTaskData } from '../models/utils/validators.js';

const getTasks = async (req, res) => {
    try {
        const id = req.user.id;
        const tasks = await Task.find({ userId: id });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
} 

const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user?.id;

        const newTask = await Task.create({ title, userId });
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status } = req.body;
        const userId = req.user?.id;

        await validateUpdateTaskData({ title, status, taskId: id });

        const task = await Task.findOneAndUpdate({ _id: id, userId }, { title, status }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
    
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        if (error.name === 'ValidationError' || error.message === 'Task not found') {
            return res.status(error.message === 'Task not found' ? 404 : 400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
}

export { getTasks, createTask, updateTask };

