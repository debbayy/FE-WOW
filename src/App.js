import Landing from "./pages/landingPage/Landing";
import AfterLogin from "./pages/afterLogin/afterLogin";
import Subscribe from "./pages/subscribePage/subscribe";
import ProfilePages from "./pages/profilPage/profilPage";
import AfterSubscribe from "./pages/subscribePage/afterSubscribe";
import ReadBook from "./components/blog/read";
import AddBooks from "./components/addbook/addBooks";
import Transaction from "./pages/listTrans/trans";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

//import Reactbootstrap here
import "bootstrap/dist/css/bootstrap.min.css";

//import api
import { API, setAuthToken } from "./config/api";

import { UserContextToken } from "./components/context/showContext";

//import react router

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContextToken);
  // console.clear();
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (!state.isLogin) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/transaction");
      } else if (state.user.role == "user") {
        navigate("/afterLogin");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // data user
      let payload = response.data.data.user;
      payload.token = localStorage.token;

      // send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<AfterLogin />} />
        <Route exact path="/profile" element={<AfterSubscribe />} />
        <Route exact path="/aftersubscribe" element={<Subscribe />} />
        <Route exact path="/detailbook/:id" element={<ProfilePages />} />
        <Route exact path="/addbook" element={<AddBooks />} />

        <Route exact path="/transaction" element={<Transaction />} />
        <Route exact path="/readbook/:id" element={<ReadBook />} />
        <Route exact path="/afterlogin" element={<AfterLogin />} />
      </Routes>
    </div>
  );
}

export default App;
