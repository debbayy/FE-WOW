import Profile from "../../components/profile/profile";
import FormSubscribe from "../../components/formsubscribe/formSubscribe";
import "./subscribe.css";

function Subscribe() {
  return (
    <div className="subscribe">
      <div className="afterLoginLeft position-relative">
        <div className="position-fixed">
          <Profile />
        </div>
      </div>
      <div className="subscribeRight">
        <FormSubscribe />
      </div>
    </div>
  );
}

export default Subscribe;
