import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Columns from "components/Columns";
import ModalColumn from "components/ModalColumn";
import addIcon from "images/addIcon.svg";

const IndexPage = () => {
  const [columns, setColumns] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("rabzKanban")) {
      history.push("/login");
    }
  }, [history]);

  const localUrl = "http://localhost:1337";

  useEffect(() => {
    //  ====================== FETCH API's ======================

    fetch(process.env.API_URL || localUrl + "/columns")
      .then((res) => res.json())
      .then((result) => setColumns(result));

    fetch(process.env.API_URL || localUrl + "/tasks")
      .then((res) => res.json())
      .then((result) => setTasks(result));
  }, []);

  //  ====================== EVENT HANDLERS ======================

  const handleRemoveLocalStorage = () => {
    localStorage.removeItem("rabzKanban");
    if (!localStorage.getItem("rabzKanban")) {
      history.push("/login");
    }
  };

  const handleClickAddColumn = (label) => {
    label &&
      fetch(process.env.API_URL || localUrl + "/columns", {
        method: "POST",
        body: JSON.stringify({
          Label: label,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          setColumns((prevColumn) => [...prevColumn, result]);
        });
  };

  const handleSubmitAddTask = (columnId, label) => {
    label &&
      fetch(process.env.API_URL || localUrl + "/tasks", {
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

  const handleClickColumnDelete = (colId) => {
    fetch(process.env.API_URL || localUrl + "/columns/" + colId, {
      method: "DELETE",
    });
    const updatedCol = columns.filter((del) => del.id !== colId);
    setColumns(updatedCol);
  };

  const handleClickTaskDelete = (taskId) => {
    // console.log(taskId);
    fetch(process.env.API_URL || localUrl + "/tasks/" + taskId, {
      method: "DELETE",
    });
    const updatedTask = tasks.filter((del) => del.id !== taskId);
    setTasks(updatedTask);
  };

  // ====================== GETTER ======================

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
          <span
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={handleRemoveLocalStorage}
            className="float-right mr-5"
          >
            <small>LOGOUT</small>
          </span>
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
};
export default IndexPage;
