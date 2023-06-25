import { useContext, useEffect, useState } from "react";
import TodoContex, {
  ISubtask,
  ITask,
  TodoContextType,
} from "../../contexts/TodoContext";
import "./Card.css";
import SubTaskCard from "../subTaskCard/SubTaskCard";

export default function Card({ task }: { task: ITask }) {
  const {
    deleteTask,
    updateTaskStatus,
    updateTaskTitle: updateTask,
    addSubtask,
  } = useContext(TodoContex) as TodoContextType;

  const [isFinished, setIsFinished] = useState(task.status);
  const [textClassName, setTextClassName] = useState("task-title ");
  const [newTitle, setNewTitle] = useState(task.title);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [showSubtask, setShowSubtask] = useState(false);
  const [hasSubtask, setHasSubtask] = useState(task.subtask.length > 0);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const deleteTaskHandler = (id: string) => {
    deleteTask(id);
  };

  const editTaskHandler = (id: string) => {
    updateTask(id, newTitle);
    setNewTitle("");
    setDisplayEdit(false);
  };

  const updateTaskStatusHandler = (id: string) => {
    updateTaskStatus(id);
    setIsFinished((current) => !current);
  };

  const addSubtaskHandler = (task_id: string) => {
    addSubtask(task_id, newSubtaskTitle);
    if (hasSubtask === false) setHasSubtask(true);
    setNewSubtaskTitle("");
  };

  useEffect(() => {
    setIsFinished(task.status);
    setTextClassName(isFinished ? "task-title strike" : "task-title ");
    setHasSubtask(task.subtask.length > 0);
  }, [task, isFinished, hasSubtask, task.subtask]);

  return (
    <div className="card">
      <div className="task-container">
        <div className="contents">
          <input
            className="status"
            type="checkbox"
            id="status"
            checked={isFinished}
            onChange={() => updateTaskStatusHandler(task.id)}
            disabled={displayEdit}
          ></input>
          <div className={textClassName}>
            {displayEdit ? (
              <div className="editTask">
                <input
                  className="editTitle"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                ></input>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  onClick={() => editTaskHandler(task.id)}
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              </div>
            ) : (
              <p>{task.title}</p>
            )}
          </div>
        </div>
        <div className="icons">
          <div className="subtask" onClick={() => setShowSubtask(!showSubtask)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
            </svg>
          </div>

          <div className="delete" onClick={() => deleteTaskHandler(task.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </div>
          <div
            className="edit"
            onClick={() => !isFinished && setDisplayEdit(!displayEdit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
          </div>
        </div>
      </div>
      {showSubtask && (
        <div className="subtask-container">
          {hasSubtask ? (
            <>
              <h3>Subtasks </h3>
              {task.subtask.map((elem: ISubtask) => (
                <SubTaskCard subTask={elem} key={elem.id} />
              ))}
            </>
          ) : (
            <>
              <p className="no-todo">No Subtasks</p>
            </>
          )}
          <div className="add-subtask">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              onClick={() => newSubtaskTitle && addSubtaskHandler(task.id)}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>
            <div className="subtask-wrapper">
              <input
                type="text"
                name="subtask-title"
                className="subtask-title"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
