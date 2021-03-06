import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalTask = ({ handleSubmitAddTask, show, onHide, colId }) => {
  const [newVal, setNewVal] = React.useState(" ");

  const handleChange = (e) => {
    setNewVal(e.target.value);
  };

  const onSubmitTask = (e) => {
    e.preventDefault();
    handleSubmitAddTask(colId, newVal);
    setNewVal(" ");
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitTask}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Add Task</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Task"
              onChange={handleChange}
              value={newVal}
            />
            <Button type="submit" className="mt-3 mr-3" variant="success">
              Add
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ModalTask;
