import { useContext } from "react";
import Card from "../card/Card";
import "./Cards.css";
import TodoContex, { ITask, TodoContextType } from "../../contexts/TodoContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Cards() {
  const { tasks, rearrangePriority } = useContext(
    TodoContex
  ) as TodoContextType;

  const rearrangeTasksHandler = (result: any) => {
    if (
      result.destination === null ||
      result.destination.index === result.source.index
    )
      return;
    rearrangePriority(
      result.source.index,
      result.destination.index,
      result.draggableId
    );
  };

  return (
    <div className="cards wrapper">
      {tasks.length > 0 ? (
        <DragDropContext onDragEnd={(result) => rearrangeTasksHandler(result)}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                className="dropableSection"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task: ITask, index: number) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="draggableSection"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                      >
                        <Card task={task} key={task.id} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <>
          <p className="no-todo">No Todos</p>
        </>
      )}
    </div>
  );
}
