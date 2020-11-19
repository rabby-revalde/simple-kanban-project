import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalTask = (props) => {
  return (
    <Modal
      {...props}
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
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Add Task</Form.Label>
          <Form.Control type="text" placeholder="Enter a Task" />
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
};
export default ModalTask;
