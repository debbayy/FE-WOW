import Profile from "../../components/profile/profile";
import FormSubscribe from "../../components/formsubscribe/formSubscribe";
import "./subscribe.css";

function Subscribe() {
  return (
    <div className="subscribe">
      <div className="subscribeLeft">
        <Profile />
      </div>
      <div className="subscribeRight">
        <FormSubscribe />
      </div>
    </div>
  );
}

export default Subscribe;
