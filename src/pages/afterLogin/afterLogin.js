import "./afterLogin.css";

import Profile from "../../components/profile/profile";
import Blog from "../../components/blog/blog";

function AfterLogin() {
  return (
    <div className="afterLogin">
      <div className="afterLoginLeft position-relative">
        <div className="position-fixed">
          <Profile />
        </div>
      </div>
      <div className="afterLoginRight">
        <Blog />
      </div>
    </div>
  );
}

export default AfterLogin;
