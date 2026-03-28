import Task from '../models/task.model.js';

const backgroundTaskProccess = async (userId) => {
    try {
        const tasks = [
            { title: 'Task 1', status: 'pending', userId },
            { title: 'Task 2', status: 'in-progress', userId },
            { title: 'Task 3', status: 'completed', userId }
        ];

        await Task.insertMany(tasks);
    } catch (error) {
        console.error('Error creating background tasks:', error);
    }
};

export default backgroundTaskProccess;