import NavbarAddBook from "../../components/navbar/nav";
import { Table, Dropdown, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { UserContextToken } from "../../components/context/showContext";

import { API } from "../../config/api";

function Transaction() {
  const [trans, setTrans] = useState([]);
  const [action, setAction] = useState(false);
  const [state, dispatch] = useContext(UserContextToken);

  const [detailTrans, setDetailTrans] = useState({
    userStatus: "Active",
    remainingActive: 30,
    paymentStatus: "Approve",
  });

  const [cancel, setCancel] = useState({
    userStatus: "",
    remainingActive: 0,
    paymentStatus: "Cancel",
  });

  const getTransaction = async () => {
    try {
      const response = await API.get("/transactions");
      setTrans(response.data.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleApprove = async (id) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //     await API.patch(`/transaction/${id}`, approve, config);

  //     const gettras = await API.get(`/transaction/${id}`);
  //     console.log(gettras);

  //     let appSub = {
  //       isSub: "true",
  //     };

  //     const updateUser = await API.patch(
  //       `/user/${gettras.data.data.user.user.id}`,
  //       appSub,
  //       config
  //     );
  //     console.log(id);

  //     console.log(updateUser);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setAction(!action);
  // };

  // const handleCancel = async (id) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //     const res = await API.patch(`/transaction/${id}`, cancel, config);

  //     console.log(res);
  //     setAction(!action);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleApprove = async (id, idUser) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setDetailTrans({
        userStatus: "active",
        // timeApprove: new Date(),
        remainingActive: 30,
        paymentStatus: "Approve",
      });

      const response = await API.patch(
        `/transaction/${id}`,
        detailTrans,
        config
      );

      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.patch(`/transaction/${id}`, cancel, config);
      console.log(response);
      getTransaction();
      // Navigate("/listtrans");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, [action]);

  return (
    <div>
      <div>
        <NavbarAddBook />
      </div>
      <div
        style={{
          width: "90%",
          paddingLeft: "150px",
        }}
      >
        <h1>Incoming Transaction</h1>
        <br />

        <Table hover>
          <thead style={{ color: "red" }}>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Bukti Transfer</th>
              <th>Remaining Active</th>
              <th>Status User</th>
              <th>Status</th>
              <th>Payment Action</th>
            </tr>
          </thead>
          <tbody>
            {trans.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.user.fullName}</td>
                <td>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={` http://localhost:5000/uploads/transaksi/${item.transferProof}`}
                    target="_blank"
                  >
                    {item.transferProof}
                  </a>
                </td>
                <td>{item.remainingActive}/Hari</td>

                <td className="fw-bold">
                  {item.userStatus === "not Actived" ? (
                    <span className="text-danger fw-bold"> Not Active</span>
                  ) : item.paymentStatus === "Approve" ? (
                    <span className="text-success fw-bold">Active</span>
                  ) : (
                    <span className="text-danger fw-bold">Not Active</span>
                  )}
                </td>

                <td>
                  {item.paymentStatus === "Approve" ? (
                    <span className="text-success fw-bold">Approve</span>
                  ) : item.paymentStatus === "pending" ? (
                    <span className="text-warning fw-bold">Panding</span>
                  ) : (
                    <span className="text-danger fw-bold">Cancel</span>
                  )}
                </td>
                <td>
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle
                        split
                        variant=""
                        id="dropdown-split-basic"
                      />

                      <Dropdown.Menu>
                        <Dropdown.Item
                          style={{ color: "#0ACF83", fontWeight: "bold" }}
                          onClick={() => handleApprove(item.id)}
                        >
                          Approved
                        </Dropdown.Item>
                        <Dropdown.Item
                          style={{ color: "#FF0000", fontWeight: "bold" }}
                          onClick={() => handleCancel(item.id)}
                        >
                          Cancel
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Transaction;
