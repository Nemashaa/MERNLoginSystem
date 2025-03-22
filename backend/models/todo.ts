import mongoose, { Document, Schema } from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose as any); // Explicitly cast mongoose to `any` for compatibility

interface ITodo extends Document {
  userId: string;
  todoId: number;
  title: string;
  completed: boolean;
  user: mongoose.Types.ObjectId; // Add the `user` property explicitly
}

const TodoSchema = new Schema<ITodo>({
  userId: { type: String, required: true },
  todoId: { type: Number, unique: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Define the `user` field in the schema
});

// Apply the AutoIncrement plugin with `any` type for compatibility
TodoSchema.plugin(AutoIncrement as any, { inc_field: 'todoId' });

export default mongoose.model<ITodo>('Todo', TodoSchema);
