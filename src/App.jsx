import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialWeeks = {
  week1: {
    name: "Week 1",
    lessons: [
      { id: "lesson-1", content: "Intro to Perspective" },
      { id: "lesson-2", content: "One-Point Perspective" }
    ]
  },
  week2: {
    name: "Week 2",
    lessons: [
      { id: "lesson-3", content: "Two-Point Perspective" }
    ]
  }
};

function App() {
  const [weeks, setWeeks] = useState(initialWeeks);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceWeek = weeks[source.droppableId];
    const destWeek = weeks[destination.droppableId];
    const draggedLesson = sourceWeek.lessons[source.index];

    if (source.droppableId === destination.droppableId) {
      const updatedLessons = Array.from(sourceWeek.lessons);
      updatedLessons.splice(source.index, 1);
      updatedLessons.splice(destination.index, 0, draggedLesson);

      setWeeks({
        ...weeks,
        [source.droppableId]: {
          ...sourceWeek,
          lessons: updatedLessons
        }
      });
    } else {
      const sourceLessons = Array.from(sourceWeek.lessons);
      sourceLessons.splice(source.index, 1);
      const destLessons = Array.from(destWeek.lessons);
      destLessons.splice(destination.index, 0, draggedLesson);

      setWeeks({
        ...weeks,
        [source.droppableId]: {
          ...sourceWeek,
          lessons: sourceLessons
        },
        [destination.droppableId]: {
          ...destWeek,
          lessons: destLessons
        }
      });
    }
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Semester Planner POC</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto">
          {Object.entries(weeks).map(([weekId, week]) => (
            <Droppable droppableId={weekId} key={weekId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded p-4 w-64 min-w-[16rem]"
                >
                  <h2 className="font-semibold mb-2">{week.name}</h2>
                  {week.lessons.map((lesson, index) => (
                    <Draggable
                      draggableId={lesson.id}
                      index={index}
                      key={lesson.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 rounded shadow mb-2"
                        >
                          {lesson.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
