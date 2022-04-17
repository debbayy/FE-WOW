import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./blog.css";

//import images in here

import { UserContextToken } from "../context/showContext";

import BlogImage from "../../media/Frame 1.png";
import Rectangle1 from "../../media/Rectangle1.png";
import Rectangle2 from "../../media/Rectangle2.png";
import Rectangle3 from "../../media/Rectangle3.png";
import Rectangle4 from "../../media/Rectangle4.png";

//import modal here
import { Alert, Modal, Button, setModalShow, Form } from "react-bootstrap";

import { API } from "../../config/api";

function Blog() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const [state, dispacth] = useContext(UserContextToken);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  // function hendleShow() {
  //   navigate("/detailProfile");
  // }

  function closeShow() {
    setShowModal(false);
  }

  const [book, setBook] = useState([]);

  const getBooks = async () => {
    try {
      const response = await API.get("/books");
      setBook(response.data.data);
      console.log(response);
      //  console.log(book);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed !!
        </Alert>
      );
      setMessage(alert);
      // console.log(error);
    }
  };

  // const handleshow = () => {
  //   dispacth({
  //     type: "SHOW_MODAL",
  //     payload: { show: true },
  //   });
  // };

  useEffect(() => {
    getBooks();
  }, []);

  console.log(show);
  return (
    <div className="pageBar row container">
      <Modal
        className="d-flex align-items-center "
        show={showModal}
        onHide={closeShow}
      >
        <Form>
          <Form.Group className="mb-3 text-center my-2 mx-3 px-4 ">
            <Form.Label className="text-danger text-xl-center fw-bold my-3 ">
              Please make a payment to read the latest books
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal>
      <div className="row">
        <div className="picture">
          <img src={BlogImage} alt="" srcset="" />
        </div>
        <div className="ms-3 my-3">
          <h1>List Book</h1>
        </div>

        <div className="d-flex mx-2 row ">
          {book.map((item) => {
            return (
              <div className="col-3 bg-info text-start">
                {state.user.isSub === "false" ? (
                  <>
                    <div style={{ cursor: "pointer" }} onClick={openModal}>
                      {showModal ? <Modal setShowModal={setShowModal} /> : null}
                      <img className="d-flex" src={item.image} alt="" />
                      <h4>{item.title.slice(0, 5) + "..."}</h4>
                      <p>{item.about.slice(0, 15) + "...."}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="col-3 text-start"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/detailbook/${item.id}`);
                      }}
                    >
                      <img className="d-flex" src={item.image} alt="" />
                      <h4>{item.title.slice(0, 6) + ".."}</h4>
                      <p>{item.author.slice(0, 7) + "."}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Blog;
