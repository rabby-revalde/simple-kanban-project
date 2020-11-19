import React from "react";
// import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import Tasks from "./Tasks";
import deleteICon from "../images/deleteIcon.svg";
import addIcon from "../images/addIcon.svg";
// import H2 from "./H2";

const Columns = ({
  data: { columns },
  actions: {
    handleClickTaskDelete,
    handleClickAddTask,
    handleClickColumnDelete,
    getColumnsById,
    getTasksById,
  },
}) => {
  return (
    <>
      {columns.map((column) => (
        <Col md={4}>
          <div className="bg-light p-3">
            <h5 className="border-bottom pb-3 font-weight-bold">
              {column.label}
              <img
                onClick={() => handleClickAddTask(column.id)}
                src={addIcon}
                alt="addIcon"
                title="Add new Task"
                width={18}
                style={{ cursor: "pointer", marginLeft: "15px" }}
              />
              {getColumnsById(column.id).length < 1 && (
                <img
                  onClick={() => handleClickColumnDelete(column.id)}
                  src={deleteICon}
                  alt="deleteICon"
                  title="Delete this Column"
                  className="float-right"
                  width={18}
                  style={{ cursor: "pointer" }}
                />
              )}
            </h5>
            <div key={column.id}>
              <Tasks
                handleClickTaskDelete={handleClickTaskDelete}
                getColumnsById={getColumnsById}
                columnId={column.id}
                getTasksById={getTasksById}
              />

              {/* Show only if column has no tasks */}
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default Columns;
