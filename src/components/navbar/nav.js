import React, { useState, useContext } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContextToken } from "../context/showContext";

/* import css global here */
import "./nav.css";

//import images
import Logo from "../../media/iconProfile.png";
import ImageProfile from "../../media/Ellipse 1.png";
import LogoAdd from "../../media/GroupBLK.png";
import Logoout from "../../media/logout.png";
import IconSubscribe from "../../media/bill 1.png";

//create use navigate

function NavbarAddBook() {
  const navigate = useNavigate();
  const [state, dispacth] = useContext(UserContextToken);

  function logout() {
    dispacth({
      type: "LOGOUT",
      isLogin: false,
    });
    navigate("/");
  }

  function switchAddbook() {
    navigate("/addbook");
  }
  function switchTransaction() {
    navigate("/transaction");
  }
  function switchAfterLogin() {
    navigate("/afterLogin");
  }
  return (
    <div>
      <Navbar className="">
        <Container>
          <Navbar.Brand onClick={switchTransaction}>
            <img
              src={Logo}
              style={{ cursor: "pointer" }}
              /* onClick={goToHome} */
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Dropdown className="drop">
            <Dropdown.Toggle variant="">
              <img src={ImageProfile} alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="icon py-2 px-2">
              <Dropdown.Item className="text-center fw-bold" onClick={""}>
                {state.user.fullName}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={switchAddbook}>
                <img src={LogoAdd} alt="" />
                Add Book
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={switchTransaction}>
                <img src={IconSubscribe} alt="" />
                Transaction
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>
                <img src={Logoout} alt="" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarAddBook;
