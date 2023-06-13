import { createContext } from "react";

export interface ITask {
  id: number;
  title: string;
  status: boolean;
}
export type TodoContextType = {
  tasks: ITask[];
  addTask: (title: string) => void;
  updateTask: (id: number, title: string) => void;
  updateTaskStatus: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TodoContex = createContext<TodoContextType | null>(null);

export default TodoContex;
