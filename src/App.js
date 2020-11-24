import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import Columns from "./components/Columns";
import ModalColumn from "./components/ModalColumn";
import addIcon from "./images/addIcon.svg";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [columns, setColumns] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const apiUrl = process.env.API_URL || "http://localhost:1337";

  useEffect(() => {
    fetch(apiUrl + "/columns")
      .then((res) => res.json())
      .then((result) => setColumns(result));

    fetch(apiUrl + "/tasks")
      .then((res) => res.json())
      .then((result) => setTasks(result));
  }, []);

  const handleClickAddColumn = (label) => {
    // const label = prompt("What's the column name?");
    label &&
      fetch(apiUrl + "/columns", {
        method: "POST",
        body: JSON.stringify({
          // id: columns.length + 1,
          Label: label,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          setColumns((prevColumn) => [...prevColumn, result]);
        });

    // label &&
    //   setColumns([...columns, { Label: label, id: label.toLowerCase() }]);
  };

  const handleSubmitAddTask = (columnId, label) => {
    label &&
      fetch(apiUrl + "/tasks", {
        method: "POST",
        body: JSON.stringify({
          Label: label,
          column: columnId,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          setTasks((prevTask) => [...prevTask, result]);
        });
  };

  const handleClickColumnDelete = async (colId) => {
    await fetch(apiUrl + "/columns/" + colId, {
      method: "DELETE",
    });
    const updatedCol = columns.filter((del) => del.id !== colId);
    setColumns(updatedCol);
  };

  const handleClickTaskDelete = (taskId) => {
    // console.log(taskId);
    const updatedTask = tasks.filter((del) => del.id !== taskId);
    setTasks(updatedTask);
  };

  const getColumnsById = (colId) =>
    tasks &&
    tasks.filter((task) => {
      if (task.column !== null) {
        return task.column.id === colId;
      }
    });

  const getTasksById = (taskId, colId) =>
    tasks &&
    tasks.find((task) => {
      if (task.column.id === colId && task.id === taskId) {
        return task.Label;
      }
      return null;
    });

  // console.log(getTasksById(1, 1));
  // console.log(tasks);
  return (
    <div>
      <div className="sample-title text-center py-4 bg-light">
        <h1>
          Simple Kanban{" "}
          <img
            onClick={() => setModalShow(true)}
            src={addIcon}
            alt="addIcon"
            title="Add New Column"
            style={{ cursor: "pointer", marginLeft: "15px" }}
          />
          <ModalColumn
            handleClickAddColumn={handleClickAddColumn}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </h1>
      </div>
      <Container>
        <Row className="mt-5">
          <Columns
            data={{ columns, tasks }}
            actions={{
              handleClickTaskDelete,
              handleSubmitAddTask,
              handleClickColumnDelete,
              getColumnsById,
              getTasksById,
            }}
          />
        </Row>
      </Container>
    </div>
  );
}

export default App;
