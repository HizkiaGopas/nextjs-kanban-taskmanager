import mongoose, { Schema, Document, model, models } from "mongoose";

// 1. Definisikan interface TypeScript untuk Model Task
export interface ITask extends Document {
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  createdAt: Date;
}

// 2. Buat Mongoose Schema dengan atribut ala Kanban Notion
const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Judul tugas wajib diisi"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Otomatis membuat createdAt dan updatedAt
  }
);

// 3. Export model. Jika model sudah ada (karena HMR), gunakan yang sudah ada.
const Task = models.Task || model<ITask>("Task", TaskSchema);

export default Task;