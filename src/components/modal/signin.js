import { Modal, Button, Form } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowModalContext } from "../context/showModalSub";
import { Alert } from "react-bootstrap";
import { UserContextToken } from "../context/showContext";

import { API } from "../../config/api";

function SignIn() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [token, setToken] = useContext(UserContextToken);

  console.log(token);

  ///////////////////////
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Convert form data to string here ...
      const body = JSON.stringify(form);

      // Insert data user for login process here ...
      const response = await API.post("/login", body, config);
      console.log(response);

      setToken({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      // Checking process
      // Status check
      if (response.data.data.role == "admin") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        navigate("/transaction");
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        dispacth({
          type: "SHOW_MODAL",
          payload: {
            showSignin: false,
            showSignup: false,
          },
        });
        navigate("/afterlogin");
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed !!
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  ////////////////////
  const [state, dispacth] = useContext(ShowModalContext);

  const handleSignin = () => {
    dispacth({
      type: "SHOW_MODAL",
      payload: {
        showSignin: true,
        showSignup: false,
      },
    });
  };

  function switchsignup() {
    dispacth({
      type: "SHOW_MODAL",
      payload: {
        showSignin: false,
        showSignup: true,
      },
    });
  }

  function hidesignin() {
    dispacth({
      type: "SHOW_MODAL",
      payload: {
        showSignin: false,
        showSignup: false,
      },
    });
  }

  return (
    <>
      <Modal
        className="p-5 my-3"
        show={state.show.showSignin}
        onHide={hidesignin}
      >
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1 className="mb-4">Sign In</h1>
          {message && message}
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Control
              className="py-3"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={email}
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className="py-3"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
              name="password"
            />
          </Form.Group>

          <Form.Group className="d-grid gap-2 py-4">
            <Button type="submit" variant="danger" size="lg">
              Sign In
            </Button>
          </Form.Group>

          <Form.Text className="text-muted d-center ">
            <p className="text-center">
              Don't have an account ? Klik
              <span
                style={{ cursor: "pointer  " }}
                className=" ms-1 fw-bold"
                onClick={switchsignup}
              >
                Here
              </span>
            </p>
          </Form.Text>
        </Form>
      </Modal>
      <Button
        className=" ms-5 px-5 py-2 "
        variant="light"
        onClick={handleSignin}
      >
        Sign In
      </Button>
    </>
  );
}

export default SignIn;
