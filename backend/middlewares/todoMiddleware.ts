import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Request, Response, NextFunction } from 'express';
import Todo from '../models/todo';

export const checkTodoOwnership = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    if (todo.user.toString() !== req.user?._id) {
      res.status(403).json({ message: 'You are not authorized to modify this todo' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
