import React from "react";
import deleteICon from "../images/deleteIcon.svg";
import editIcon from "../images/editIcon.svg";

const Tasks = ({ handleClickTaskDelete, task }) => {
  // console.log(task);
  return (
    <p key={task.id} className="task border-bottom pt-2 pb-3">
      {task && task.Label}
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
        src={editIcon}
        alt="deleteICon"
        className="float-right"
        width={18}
        title="Edit this Task"
        style={{ cursor: "pointer" }}
      />
    </p>
  );
};
export default Tasks;
