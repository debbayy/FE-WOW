import { Modal, Button, Form, Alert } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { ShowModalContext } from "../context/showModalSub";
import { useNavigate } from "react-router-dom";
import { UserContextToken } from "../context/showContext";

import { API } from "../../config/api";

function SignUp() {
  const navigate = useNavigate();
  /*   const [token, setToken] = useContext(UserContextToken);
   */
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { fullName, email, password } = form;

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

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log("ini res" + response);

      /*    setToken({
        type: "LOGIN_SUCCESS",
        payload: response.data.user,
      }); */

      // Notification
      if (response.data.status == "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
      navigate("/");
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

  ///////////////////////////////////
  const [state, dispacth] = useContext(ShowModalContext);

  console.log(state);

  const hideSignup = () => {
    dispacth({
      type: "SHOW_MODAL",
      payload: {
        showSignin: false,
        showSignup: false,
      },
    });
  };

  const handleSignup = () => {
    dispacth({
      type: "SHOW_MODAL",
      payload: {
        showSignup: true,
        showSignin: false,
      },
    });
  };

  function switchsignin() {
    dispacth({
      type: "SHOW_MODAL",
      payload: {
        showSignup: false,
        showSignin: true,
      },
    });
  }

  return (
    <>
      <Modal className="p-3" show={state.show.showSignup} onHide={hideSignup}>
        <Form className="p-5 " onSubmit={handleSubmit}>
          <h1 className="mb-4">Sign Up</h1>
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className="py-3"
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              value={fullName}
              name="fullName"
            />
          </Form.Group>

          <Form.Group className="d-grid gap-2 py-4">
            <Button type="submit" variant="danger" size="lg">
              Sign Up
            </Button>
          </Form.Group>

          <Form.Text className=" text-center">
            <p className="text-center">
              Already have an account ? Klik
              <span
                style={{ cursor: "pointer" }}
                className=" ms-1 fw-bold"
                onClick={switchsignin}
              >
                Here
              </span>
            </p>
          </Form.Text>
        </Form>
      </Modal>
      <Button
        className=" ms-5 px-5 py-2 "
        variant="danger"
        onClick={handleSignup}
      >
        Sign Up
      </Button>
    </>
  );
}

export default SignUp;
