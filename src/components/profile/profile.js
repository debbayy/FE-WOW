import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

import { UserContextToken } from "../context/showContext";

//import images
import IconProfile from "../../media/iconProfile.png";
import PhotoProfile from "../../media/photoProfile.png";
import IconUser from "../../media/user 1.png";
import IconLogout from "../../media/logout 1.png";
import IconSubscribe from "../../media/bill 1.png";

import { API } from "../../config/api";

//import usecontex

function Profile() {
  const navigate = useNavigate();
  const [state, dispacth] = useContext(UserContextToken);

  function logout() {
    dispacth({
      type: "LOGOUT",
      isLogin: false,
    });
    navigate("/");
  }

  function switchSub() {
    navigate("/aftersubscribe");
  }

  function stayhome() {
    navigate("/afterLogin");
  }

  function goToProfile() {
    navigate("/profile");
  }
  ////////////////////////
  console.log(state);
  const [profile, setUser] = useState([]);

  const getUser = async () => {
    try {
      const response = await API.get("/users");
      setUser(response.data.data.user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="containerProfile">
      <div className="profile">
        <div>
          <img
            src={IconProfile}
            style={{ cursor: "pointer" }}
            alt=""
            srcset=""
            onClick={stayhome}
          />

          <img
            src={PhotoProfile}
            style={{ cursor: "pointer" }}
            onClick={goToProfile}
            alt=""
            srcset=""
          />
        </div>
        <h3 className="my-2" style={{ cursor: "pointer" }}>
          {state.user.fullName}
        </h3>
        <>
          {state.user.isSub === "true" ? (
            <>
              <p className="text-success px-5" style={{ cursor: "pointer" }}>
                Subscribe
              </p>
            </>
          ) : (
            <>
              <p className="text-danger" style={{ cursor: "pointer" }}>
                Not Subscribed Yet
              </p>
            </>
          )}
        </>
      </div>
      <hr />
      <>
        {state.user.isSub === "true" ? (
          <>
            <div
              className="icon"
              style={{ cursor: "pointer" }}
              onClick={goToProfile}
            >
              <div>
                <p>
                  <img src={IconUser} />
                  Profile
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="icon hoverProvile" style={{ cursor: "pointer" }}>
              <div>
                <p>
                  <img src={IconUser} />
                  Profile
                </p>
              </div>
            </div>
          </>
        )}
      </>

      <div
        className="icon"
        style={{ cursor: "pointer" }}
        /*  onClick={goToSubscribe} */
      >
        <div onClick={switchSub}>
          <p>
            <img src={IconSubscribe} alt="" srcset="" />
            Subscribe
          </p>
        </div>
      </div>
      <hr />
      <div className="icon" style={{ cursor: "pointer" }} onClick={logout}>
        <div>
          <p>
            <img src={IconLogout} alt="" srcset="" />
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
