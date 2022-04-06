import React, { useState, useEffect } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config/api";
import Logo from "../../media/iconProfile.png";

const ReadBook = () => {
  const [read, setRead] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  function gotoHome() {
    navigate("/afterLogin");
  }

  console.log(id);

  const getBook = async () => {
    try {
      const response = await API.get(`/book/${id}`);
      setRead(response.data.data);
      console.log(response.data.data);
      /* console.log(read); */
      console.log(read.abautThisBook);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const ownStyles = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      color: "rgba(205, 205, 205, 0.7)",
    },
  };
  return (
    <div className="position-relative">
      <div>
        <img className="py-4 mx-5" src={Logo} onClick={gotoHome} />
      </div>
      <div style={{ height: "100vh", position: "relative" }}>
        <ReactReader
          styles={ownStyles}
          url={`http://localhost:5000/uploads/books/${read.abautThisBook}`}
        />
      </div>
    </div>
  );
};

export default ReadBook;
