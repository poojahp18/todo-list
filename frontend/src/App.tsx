import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/cards";
import TodoContex, { ISubtask, ITask } from "./contexts/TodoContext";
import AddTask from "./components/addTask/AddTask";
import { nanoid } from "nanoid";

function App() {
  const [prio, setPrio] = useState<number>(1);
  const dummy_tasks: ITask[] = [
    {
      id: nanoid(),
      title: "Task 1",
      status: false,
      subtask: [
        {
          id: 1,
          title: "Task 12656",
          status: false,
          task_id: "3p42aSABChury5ZF_VWda",
        },
      ],
      priority: 1,
    },
    {
      id: nanoid(),
      title: "Task 2",
      status: true,
      subtask: [
        {
          id: 1,
          title: "Task 1",
          status: false,
          task_id: "tTxcALRnECEhqjPLTtV4_",
        },
        {
          id: 2,
          title: "Task 1",
          status: false,
          task_id: "tTxcALRnECEhqjPLTtV4_",
        },
      ],
      priority: prio + 1,
    },
  ];

  const [tasks, setTasks] = useState<ITask[]>(dummy_tasks);
  const [filteredTask, setFilteredTask] = useState<ITask[]>(tasks);
  const [sortTask, setSortTask] = useState<ITask[]>(tasks);
  const [filter, setFilter] = useState("all");

  const updateTaskTitle = (id: string, title: string) => {
    tasks.filter((task: ITask) => {
      if (task.id === id) {
        task.title = title;
        setTasks([...tasks]);
      }
    });
  };

  const updateTaskStatus = (id: string) => {
    tasks.filter((task: ITask) => {
      if (task.id === id) {
        task.status = !task.status;
        console.log(tasks);

        setTasks([...tasks]);
      }
    });
  };

  const updateSubtaskStatus = (subtask_id: number, task_id: string) => {
    console.log(task_id + ": " + subtask_id);
    tasks.filter((task) => {
      if (task.id === task_id) {
        task.subtask.map((elem) => {
          if (elem.id === subtask_id) {
            elem.status = !elem.status;
          }
        });
      }
      setTasks([...tasks]);
    });
  };

  const deleteTask = (id: string) => {
    const updatedTasks: ITask[] = tasks.filter((task: ITask) => task.id !== id);
    setTasks(updatedTasks);
  };

  const addTask = (title: string) => {
    if (title) {
      const newTask: ITask = {
        id: nanoid(),
        title: title,
        status: false,
        subtask: [],
        priority: prio,
      };
      setPrio(prio + 1);
      setTasks([...tasks, newTask]);
    }
  };

  const updateSubTask = (id: string, subtask: ISubtask) => {
    tasks.filter((task: ITask) => {
      if (task.id === id) {
        task.subtask.filter((elem: ISubtask) => {
          if (subtask.id === elem.id) {
            elem.title = subtask.title;

            setTasks([...tasks]);
          }
        });
      }
    });

    console.log(tasks);
  };

  const deleteSubtask = (subtask_id: number, task_id: string) => {
    tasks.filter((task) => {
      if (task.id === task_id) {
        const updatedsubTask: ISubtask[] = task.subtask.filter((elem) => {
          return elem.id !== subtask_id;
        });
        task.subtask = updatedsubTask;
      }
    });
    setTasks([...tasks]);
    console.log(tasks);
  };

  const addSubtask = (task_id: string, subtaskTitle: string) => {
    const newSubtask: ISubtask = {
      id: 4,
      title: subtaskTitle,
      status: false,
      task_id: task_id,
    };
    console.log(task_id + ":" + subtaskTitle);
    tasks.filter((task) => {
      if (task.id === task_id) {
        task.subtask.push(newSubtask);
      }
      setTasks([...tasks]);
    });
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

  const sortPriority = () => {
    const taskList: ITask[] = filteredTask;
    taskList.sort((task1: ITask, task2: ITask) => {
      return task1.priority - task2.priority;
    });
    setSortTask(taskList);
  };

  useEffect(() => {
    sortPriority();
    console.log(sortTask);
  }, [filteredTask]);

  useEffect(() => {
    filterTasks(filter);
    if (prio === 1) {
      setPrio(3);
    }
  }, [tasks, filter]);

  return (
    <TodoContex.Provider
      value={{
        tasks: sortTask,
        addTask,
        updateTaskTitle,
        updateTaskStatus,
        deleteTask,
        updateSubTask,
        deleteSubtask,
        updateSubtaskStatus,
        addSubtask,
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
