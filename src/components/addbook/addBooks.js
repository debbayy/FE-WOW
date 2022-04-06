import React, { useState, useContext } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//import navbar
import NavbarAddBook from "../navbar/nav";

//import css here
import "./addBooks.css";

//import images
import AddBook from "../../media/Group.png";
import Frame from "../../media/Frame 2.png";

import { API } from "../../config/api";

import Swal from "sweetalert2";

function AddBooks() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    abautThisBook: null,
    image: null,
  });

  const {
    title,
    publicationDate,
    pages,
    author,
    isbn,
    about,
    abautThisBook,
    image,
  } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "image") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
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

      // Convert form data to string here ...
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("author", form.author);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);
      formData.set("abautThisBook", form.abautThisBook[0]);
      formData.set("image", form.image[0]);

      const response = await API.post("/books", formData, config);

      console.log(response);

      // Notification
      //kebandung
      if (response.status === 200) {
        Swal.fire("Success...", "success add New Collection...", "success");
        navigate("/transaction");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setMessage(alert);
        navigate("/addBook");
      }
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
      <div>
        <NavbarAddBook />
      </div>
      <div className="container-addbook" onSubmit={handleSubmit}>
        <h1>Add Book</h1>
        <div>
          <Form>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Title"
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Publication Date"
                onChange={handleChange}
                name="publicationDate"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Pages"
                onChange={handleChange}
                name="pages"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Author"
                onChange={handleChange}
                name="author"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                size="lg"
                type="text"
                placeholder="ISBN"
                onChange={handleChange}
                name="isbn"
              />
            </Form.Group>
            <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                placeholder="About This Book"
                rows={10}
                onChange={handleChange}
                name="about"
              />
            </Form.Group>

            <div className="attactfile ">
              <div className="add-file">
                <label>
                  Attache Book File
                  <input
                    type="file"
                    onChange={handleChange}
                    name="abautThisBook"
                  />
                  <img src={Frame} alt="" />
                </label>
              </div>

              <div className="add-image-file">
                <label>
                  Attache Image Cover
                  <input type="file" onChange={handleChange} name="image" />
                  <img src={Frame} alt="" />
                </label>
              </div>
            </div>

            <div className="add-book">
              <button type="submit">
                Add Book
                <img src={AddBook} alt="" />
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddBooks;
