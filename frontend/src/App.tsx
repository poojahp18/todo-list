import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/cards";
import TodoContex, { ITask } from "./contexts/TodoContext";
import AddTask from "./components/addTask/AddTask";

function App() {
  const [id, setId] = useState<number>(3);
  const dummy_tasks: ITask[] = [
    { id: 1, title: "Task 1", status: false },
    { id: 2, title: "Task 2", status: true },
  ];
  const [tasks, setTasks] = useState<ITask[]>(dummy_tasks);
  const [filteredTask, setFilteredTask] = useState<ITask[]>(tasks);
  const [filter, setFilter] = useState("all");

  const updateTask = (id: number, title: string) => {
    tasks.filter((task: ITask) => {
      if (task.id === id) {
        task.title = title;
        setTasks([...tasks]);
      }
    });
  };

  const updateTaskStatus = (id: number) => {
    tasks.filter((task: ITask) => {
      if (task.id === id) {
        task.status = !task.status;
        console.log(tasks);

        setTasks([...tasks]);
      }
    });
  };

  const deleteTask = (id: number) => {
    const newTasks: ITask[] = tasks.filter((task: ITask) => {
      return task.id !== id;
    });
    console.log(newTasks);
    setTasks(newTasks);
  };

  const addTask = (title: string) => {
    if (title) {
      const newTask: ITask = {
        id: id,
        title: title,
        status: false,
      };
      setId(id + 1);
      setTasks([...tasks, newTask]);
    }
  };

  const filterTasksHandler = (e: any) => {
    setFilter(e.target.value);
  };

  const filterTasks = (filter: string) => {
    let taskList: ITask[] = tasks;
    if (filter === "complete") {
      taskList = tasks.filter((task) => task.status === true);
    } else if (filter === "incomplete") {
      taskList = tasks.filter((task) => task.status === false);
    }
    setFilteredTask(taskList);
  };

  useEffect(() => {
    filterTasks(filter);
  }, [tasks, filter]);

  return (
    <TodoContex.Provider
      value={{
        tasks: filteredTask,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      <main className="todo">
        <header className="title">TODO LIST</header>
        <div className="container">
          <div className="wrapper">
            <div className="addtask-container">
              <AddTask />
            </div>
            <select
              name="todo-selector"
              className="todo-selector"
              id=""
              onChange={(e) => filterTasksHandler(e)}
            >
              <option value="all">All</option>
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </div>
          <div className="content">
            <Cards />
          </div>
        </div>
      </main>
    </TodoContex.Provider>
  );
}

export default App;
