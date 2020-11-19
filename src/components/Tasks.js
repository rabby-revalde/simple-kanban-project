import React from "react";
import deleteICon from "../images/deleteIcon.svg";
import editIcon from "../images/editIcon.svg";

const Tasks = ({
  handleClickTaskDelete,
  getColumnsById,
  columnId,
  //   getTasksById,
}) => {
  // console.log(getOneTask);
  return (
    <>
      {getColumnsById(columnId).map((task) => (
        <p key={task.id} className="task border-bottom pt-2 pb-3">
          {task.label}
          <img
            onClick={() => handleClickTaskDelete(task.id)}
            src={deleteICon}
            alt="deleteICon"
            className="float-right ml-2"
            width={18}
            title="Delete this Task"
            style={{ cursor: "pointer" }}
          />
          <img
            onClick={() => handleClickTaskDelete(task.id)}
            src={editIcon}
            alt="deleteICon"
            className="float-right"
            width={18}
            title="Edit this Task"
            style={{ cursor: "pointer" }}
          />
        </p>
      ))}
    </>
  );
};
export default Tasks;
