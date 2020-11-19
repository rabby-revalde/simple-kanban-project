import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import AddTaskModal from "./components/ModalTask";
import Columns from "./components/Columns";
import addIcon from "./images/addIcon.svg";

import "bootstrap/dist/css/bootstrap.min.css";

let initialColumns = [
  {
    id: "todo",
    label: "Todo",
  },
  {
    id: "in-progress",
    label: "In Progress",
  },
  {
    id: "completed",
    label: "Completed",
  },
];
let initialTasks = [
  {
    id: "buy-eggs",
    label: "Buy Eggs",
    column: "todo",
  },
  {
    id: "cook-dinner",
    label: "Cook Dinner",
    column: "todo",
  },
  {
    id: "creating-mock-markup",
    label: "Creating Mock Markup",
    column: "in-progress",
  },
];

function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [modalShow, setModalShow] = React.useState(false);

  const handleClickAddColumn = (e) => {
    const label = prompt("What's the column name?");
    label && setColumns([...columns, { label, id: label.toLowerCase() }]);
  };

  const handleClickAddTask = (columnId) => {
    const label = prompt("What's the task name?");
    label &&
      setTasks([
        ...tasks,
        { label, id: label.toLowerCase(), column: columnId },
      ]);
  };
  const handleClickColumnDelete = (colId) => {
    const updatedCol = columns.filter((del) => del.id !== colId);
    // console.log(updatedCol);
    setColumns(updatedCol);
  };
  const handleClickTaskDelete = (taskId) => {
    console.log(taskId);
    const updatedTask = tasks.filter((del) => del.id !== taskId);
    setTasks(updatedTask);
  };

  const getColumnsById = (colId) =>
    tasks.filter((task) => task.column === colId);

  const getTasksById = (taskId, colId) =>
    tasks.find((task) => {
      if (task.column === colId) {
        if (task.id === taskId) {
          return task.label;
        }
      }
      return null;
    });

  // console.log(getTasksById("cook-dinner", "todo"));

  return (
    <div>
      <div className="sample-title text-center py-4 bg-light">
        <h1>
          Simple Kanban{" "}
          <img
            onClick={handleClickAddColumn}
            src={addIcon}
            alt="addIcon"
            title="Add New Column"
            style={{ cursor: "pointer", marginLeft: "15px" }}
          />
        </h1>
      </div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Columns
            data={{ columns }}
            actions={{
              handleClickTaskDelete,
              handleClickAddTask,
              handleClickColumnDelete,
              getColumnsById,
              getTasksById,
            }}
          />
        </Row>
      </Container>
      <AddTaskModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default App;
