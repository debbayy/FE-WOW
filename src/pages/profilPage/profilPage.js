import DetailProfile from "../../components/profile/detailProfile";
import Profile from "../../components/profile/profile";
import "../subscribePage/subscribe.css";

function ProfilePages() {
  return (
    <div className="subscribe">
      <div className="subscribeLeft position-relative">
        <div className="position-fixed">
          <Profile />
        </div>
      </div>
      <div className="subscribeRight">
        <DetailProfile />
      </div>
    </div>
  );
}

export default ProfilePages;
