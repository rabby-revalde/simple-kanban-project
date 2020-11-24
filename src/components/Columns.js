import React from "react";
// import styled from "styled-components";
import { Col } from "react-bootstrap";
import Tasks from "./Tasks";
import deleteICon from "../images/deleteIcon.svg";
import addIcon from "../images/addIcon.svg";
import MyModal from "./ModalTask";

// import H2 from "./H2";

const Columns = ({
  data: { columns, tasks },
  actions: {
    handleClickTaskDelete,
    handleSubmitAddTask,
    handleClickColumnDelete,
    getColumnsById,
    getTasksById,
  },
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [columnId, setColumnId] = React.useState("");

  const handleClickModalShow = (colID) => {
    setModalShow(true);
    setColumnId(colID);
  };
  return (
    <>
      {columns &&
        columns.map((column) => (
          <Col key={column.id} md={4} className="mt-4">
            <div className="bg-light p-3">
              <h5 className="border-bottom pb-3 font-weight-bold">
                {column.Label}
                <img
                  onClick={() => handleClickModalShow(column.id)}
                  src={addIcon}
                  alt="addIcon"
                  title="Add new Task"
                  width={18}
                  style={{ cursor: "pointer", marginLeft: "15px" }}
                />
                {tasks && getColumnsById(column.id).length < 1 && (
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
              <div>
                {tasks &&
                  getColumnsById(column.id).map((task) => (
                    <Tasks
                      task={task}
                      handleClickTaskDelete={handleClickTaskDelete}
                      columnId={column.id}
                      getTasksById={getTasksById}
                    />
                  ))}

                {/* Show only if column has no tasks */}
              </div>
            </div>
            <MyModal
              colId={columnId}
              handleSubmitAddTask={handleSubmitAddTask}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Col>
        ))}
    </>
  );
};

export default Columns;
