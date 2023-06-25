import { createContext } from "react";

export interface ITask {
  id: string;
  title: string;
  status: boolean;
  subtask: ISubtask[];
  priority: number;
}

export interface ISubtask {
  id: number;
  title: string;
  status: boolean;
  task_id: string;
}

export type TodoContextType = {
  tasks: ITask[];
  addTask: (title: string) => void;
  updateTaskTitle: (id: string, title: string) => void;
  updateTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  updateSubTask: (id: string, subtask: ISubtask) => void;
  deleteSubtask: (subtask_id: number, task_id: string) => void;
  updateSubtaskStatus: (subtask_id: number, task_id: string) => void;
  addSubtask: (task_id: string, subtaskTitle: string) => void;
  rearrangePriority: (start: number, dest: number, task_id: string) => void;
};

const TodoContex = createContext<TodoContextType | null>(null);

export default TodoContex;
