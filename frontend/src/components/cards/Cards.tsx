import { useContext } from "react";
import Card from "../card/Card";
import "./Cards.css";
import TodoContex, { ITask, TodoContextType } from "../../contexts/TodoContext";

export default function Cards() {
  const { tasks } = useContext(TodoContex) as TodoContextType;

  return (
    <div className="cards wrapper">
      {tasks.length > 0 ? (
        <>
          {tasks.map((task: ITask) => (
            <Card task={task} key={task.id} />
          ))}
        </>
      ) : (
        <>
          <p className="no-todo">No Todos</p>
        </>
      )}
    </div>
  );
}
