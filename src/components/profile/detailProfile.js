import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
/* import images */

import Rectangle1 from "../../media/Rectangle2.png";
import IconAdd from "../../media/Vector 2.png";
import IconRead from "../../media/V.png";

import { API } from "../../config/api";

function ProfilPage() {
  const navigate = useNavigate();
  function addList() {
    navigate("/profile");
  }

  const { id } = useParams();

  function handleReadbook() {
    navigate(`/readbook/${id}`);
  }
  // geting a books
  const [book, setBook] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    abautThisBook: null,
    image: null,
  });

  // const [myBook, setMyBook] = useState({});

  const getBook = async () => {
    try {
      const response = await API.get(`/book/${id}`);
      setBook(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const getMylist = async () => {
  //   const response = await API.get(`/`);
  // };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className="containerProfile">
      <div className="profile-Detail">
        <div>
          <img src={book.image} alt="" />
        </div>
        <div className="booksDetaiL">
          <h1>{book.title}</h1>
          <label>{book.author}</label>
          <h4>Publication date</h4>
          <p>{book.publicationDate}</p>
          <h4>Pages</h4>
          <p>{book.pages}</p>
          <h4 style={{ color: "red" }}>ISBN</h4>
          <p>{book.isbn}</p>
        </div>
      </div>

      <div className="profile-Content">
        <h3>About This Book</h3>
        <p>{book.about}</p>
        <div className="btn-option">
          <button onClick={addList}>
            Add My List
            <img src={IconAdd} alt="" />
          </button>
          <button
            style={{ color: "black", backgroundColor: "#CDCDCDB2" }}
            onClick={handleReadbook}
          >
            Read Book
            <img src={IconRead} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;
