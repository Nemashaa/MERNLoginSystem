import { Request, Response } from 'express';
import Todo from '../models/todo';
import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import axios from 'axios';

// Get Todos for Authenticated User and JSONPlaceholder Todos
export const getTodos = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  const todosFromDb = await Todo.find({ userId });
  
  // Fetch sample todos from JSONPlaceholder
  const { data: jsonTodos } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');

  // Combine both data sources
  const allTodos = [...todosFromDb, ...jsonTodos];
  res.json(allTodos);
});

// Create a New Todo
export const createTodo = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  const { title } = req.body;
  const todo = await Todo.create({ userId, title, completed: false });
  res.status(201).json(todo);
});

// Update a Todo
export const updateTodo = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const updatedTodo = await Todo.findOneAndUpdate(
    { todoId: id, userId: req.user?._id },
    { title, completed },
    { new: true }
  );
  res.json(updatedTodo);
});

// Delete a Todo
export const deleteTodo = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  await Todo.findOneAndDelete({ todoId: id, userId: req.user?._id });
  res.json({ message: 'Todo deleted' });
});
