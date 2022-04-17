import IconEmail from "../../media/Vector mail.png";
import IconGender from "../../media/Vector gender.png";
import IconPhone from "../../media/Vectorw.png";
import IconAdress from "../../media/Vectornew.png";

import ProfileImages from "../../media/Rectangle 12.png";

import ImagesTessRoad from "../../media/Rectangle2.png";

import { useNavigate } from "react-router-dom";

function ProfileActive() {
  const navigate = useNavigate();

  function handleListBook() {
    navigate("/detailbook");
  }
  return (
    <div className="container-active ms-5 ps-5">
      <h1 className=" ms-3">Profile</h1>

      <div className="container-address ms-3">
        <div className="address">
          <div className="detail-address">
            <img className="icon-address" src={IconEmail} alt="" />
            <p>
              <h3>debbyganteng@gmail.com</h3>
              Email
            </p>
          </div>
          <div className="detail-address">
            <img className="icon-address" src={IconGender} alt="" />

            <p>
              <h3>Male</h3>Gender
            </p>
          </div>
          <div className="detail-address">
            <img className="icon-address" src={IconPhone} alt="" />

            <p>
              <h3>0812-8623-8911</h3>Mobile phone
            </p>
          </div>
          <div className="detail-address">
            <img className="icon-address" src={IconAdress} alt="" />

            <p>
              <h3>Perumahan Permata Hijau, Jakarta Selatan</h3>
              Address
            </p>
          </div>
        </div>

        <div className="photo-Profile">
          <img src={ProfileImages} alt="" />
          <button>Edit Profile</button>
        </div>
      </div>
      <div className=" ms-3" style={{ marginTop: "68px" }}>
        <h1>My List Book</h1>
        <img
          onClick={handleListBook}
          style={{ marginBottom: "40px" }}
          src={ImagesTessRoad}
          alt=""
        />
        <h3
          tyle={{
            marginBottom: "40px",
            fontFamily: "times",
            fontWeight: "bold",
          }}
        >
          Tess on the Road
        </h3>
        <p style={{ marginBottom: "40px" }}>Rachel Hartman</p>
      </div>
    </div>
  );
}

export default ProfileActive;
