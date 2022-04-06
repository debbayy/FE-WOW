import "./formSubscribe.css";
import React, { useContext, useState, useEffect } from "react";
import { Form, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//import images
import IconUpload from "../../media/Vector (1).png";
import ImageWow from "../../media/Wow (1).png";
import { ShowModalContext } from "../context/showModalSub";

//import modal popup here
import Sent from "../popup/donesubscribe";

//import API
import { API } from "../../config/api";

import Swal from "sweetalert2";

function FormSubscribe() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(ShowModalContext);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    accountNumber: "",
    transferProof: null,
  });

  const { accountNumber, transferProof } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "image") {
      let url = URL.createObjectURL(e.target.files[0]);
      // setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("accountNumber", form.accountNumber);
      formData.set("transferProof", form.transferProof[0]);

      const response = await API.post("/transaction", formData, config);

      console.log(response);
      if (response.status === 200) {
        Swal.fire(
          "Success...",
          "Wait for admin to comfirm your subscribe",
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      // dispatch({
      //   type: "UPDATE",
      // });
      // dispatch({
      //   type: "SUBSCRIBE",
      //   payload: false,
      // });
      // setModalShow(true);
      // setSubscribe(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log(error);
    }
  };

  return (
    <>
      <Modal>
        <Form>
          <Form.Group className="mb-3 text-center my-2 ">
            <Form.Label className="text-success text-xl-center fw-bold my-3 ">
              Thank you for subscribing to premium, your premium package will be
              active after our admin approves your transaction, thank you
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal>
      <div className="containerSubscribe">
        <form className="contentSubscribe" onSubmit={handleSubmit}>
          <div className="subcribeText">
            <h1>Premium</h1>
            <div>
              <p>
                Pay now and access all the latest books from
                <img src={ImageWow} alt="" />
              </p>

              <p>
                <img s src={ImageWow} alt="" />: 0981312323
              </p>
            </div>
          </div>
          <div className="containerForm">
            <input
              type="number"
              placeholder="Input your account 
            number"
              name="accountNumber"
              onChange={handleChange}
            />
            <label>
              Attache proof of transfer
              <input
                style={{ display: "none" }}
                type="file"
                onChange={handleChange}
                name="transferProof"
              />
              <img src={IconUpload} alt="" />
            </label>

            <button type="submit" style={{}}>
              Sent
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormSubscribe;
