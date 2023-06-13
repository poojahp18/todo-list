import { useContext, useState } from "react";
import TodoContex, { TodoContextType } from "../../contexts/TodoContext";
//import debounce from "lodash.debounce";

import "./AddTask.css";
export default function AddTask() {
  const { addTask } = useContext(TodoContex) as TodoContextType;
  const [taskTitle, setTaskTitle] = useState("");

  const addTaskHandler = () => {
    addTask(taskTitle);
    setTaskTitle("");
  };

  const handleSetTitle = (e: any) => {
    setTaskTitle(e.target.value);
  };

  //const dbTitle = debounce(handleSetTitle, 500);
  return (
    <div>
      <form>
        <input
          type="text"
          className="taskTitle"
          value={taskTitle}
          onChange={handleSetTitle}
          required
        />
        <button className="button-add" onClick={addTaskHandler}>
          Add Task
        </button>
      </form>
    </div>
  );
}
