import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';
import authMiddleware from '../middlewares/authMiddleware';
import { checkTodoOwnership } from '../middlewares/todoMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getTodos);
router.post('/', authMiddleware, createTodo);
router.put('/:id', authMiddleware, checkTodoOwnership, updateTodo);
router.delete('/:id', authMiddleware, checkTodoOwnership, deleteTodo);

export default router;
