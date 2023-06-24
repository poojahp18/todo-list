import { createContext } from "react";

export interface ITask {
  id: number;
  title: string;
  status: boolean;
  subtask: ISubtask[];
  priority: number;
}

export interface ISubtask {
  id: number;
  title: string;
  status: boolean;
  task_id: number;
}

export type TodoContextType = {
  tasks: ITask[];
  addTask: (title: string) => void;
  updateTaskTitle: (id: number, title: string) => void;
  updateTaskStatus: (id: number) => void;
  deleteTask: (id: number) => void;
  updateSubTask: (id: number, subtask: ISubtask) => void;
  deleteSubtask: (subtask_id: number, task_id: number) => void;
  updateSubtaskStatus: (subtask_id: number, task_id: number) => void;
  addSubtask: (id: number, subtaskTitle: string) => void;
};

const TodoContex = createContext<TodoContextType | null>(null);

export default TodoContex;
