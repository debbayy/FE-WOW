import { Modal, Button, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Sent() {
  /*   const [state, dispacth] = useContext();

  const [show, disShow] = useState(false);
  console.log(state);

  const navigate = useNavigate();

  function handleSub() {
    navigate("/afterlogin");
  }

  function hidenSub() {
    disShow(false);
  }

  function handleSub() {
    disShow(true);
    dispacth({
      type: "SHOW_MODAL",
      payload: true,
    });
  }
 */
  return (
    <>
      <Modal /* show={show} onHide={hidenSub} */>
        <Form>
          <Form.Group className="mb-3 text-center my-2 ">
            <Form.Label className="text-success text-xl-center fw-bold my-3 ">
              Thank you for subscribing to premium, your premium package will be
              active after our admin approves your transaction, thank you
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal>
      <Button
        className="d-grid gap-2 py-2 "
        variant="danger"
        /* onClick={handleSub} */
      >
        Send
      </Button>
    </>
  );
}

export default Sent;
