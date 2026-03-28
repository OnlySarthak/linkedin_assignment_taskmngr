import express from 'express';
import { register, login, logout } from '../controllers/login.controller.js';
import { checkAuth } from '../Middlewares/auth.middleware.js';
import { getTasks, createTask, updateTask } from '../controllers/task.controller.js';

const router = express.Router();

// User routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Task routes
router.get('/tasks', checkAuth, getTasks);
router.post('/tasks', checkAuth, createTask);
router.put('/tasks/:id', checkAuth, updateTask);

export default router;