import { Modal, Button, setModalShow, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();

  function handleSub() {
    navigate("");
  }

  return (
    <Modal
      {...props}
      size="mb"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form>
        <Form.Group className="mb-3 text-center my-2 ">
          <Form.Label
            onClick={handleSub}
            className="text-success text-xl-center fw-bold my-3 "
          >
            Please make a payment to read the latest books
          </Form.Label>
        </Form.Group>
      </Form>
    </Modal>
  );
}

function DoneSub() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        className="d-grid gap-2 py-2 "
        variant="danger"
        onClick={() => setModalShow(true)}
      >
        Send
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default DoneSub;
