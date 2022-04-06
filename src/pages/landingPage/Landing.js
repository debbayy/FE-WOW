import Bg from "../../media/Icon.png";
import "./landing.css";

/* import { Button } from "bootstrap"; */

import SignIn from "../../components/modal/signin";
import SignUp from "../../components/modal/singup";
import { useState } from "react";

function Landing() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container-landing">
      <div className="content-landing">
        <img src={Bg} alt="" />
        <div>
          <p>
            Sign-up now and subscribe to enjoy all the cool and latest books -
            The best book rental service provider in Indonesia
          </p>
        </div>
        <div>
          <SignUp show={showModal} onHide={() => setShowModal(false)} />
          <SignIn show={showModal} onHide={() => setShowModal(false)} />
        </div>
      </div>
    </div>
  );
}

export default Landing;
