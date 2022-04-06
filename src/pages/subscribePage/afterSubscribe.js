import Profile from "../../components/profile/profile";
import ProfileActive from "../../components/profile/profileActive";
import "./subscribe.css";

function AfterSubscribe() {
  return (
    <div className="subscribe">
      <div className="subscribeLeft position-relative">
        <div className="position-fixed">
          <Profile />
        </div>
      </div>
      <div className="subscribeRight">
        <ProfileActive />
      </div>
    </div>
  );
}

export default AfterSubscribe;
