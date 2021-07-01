import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { Profiler } from "react";
import "../../css/Profile.css";

const RequestedDrivers = () => {
  const [reqDrivers, setReqDrivers] = useState([]);

  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/hosp/requestedDrivers", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setReqDrivers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqDrivers]);

  const addDriver = (e) => {
    axios
      .put(
        "https://server.prioritypulse.co.in/hosp/acceptDriver",
        { driverid: e },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeDriver = (e) => {
    axios
      .delete("https://server.prioritypulse.co.in/hosp/rejectRequest", {
        data: { driverid: e },
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h4 style={{ color: "#390999", fontWeight: "800", textAlign: "center" }}>
        Drivers Request
      </h4>
      <div className="reqdriver">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Invitation</th>
            </tr>
          </thead>
          <tbody>
            {reqDrivers.map((driver, id) => {
              return (
                <tr key={id}>
                  <td>{driver.name}</td>
                  <td>{driver.mobileNo}</td>
                  <td>
                    <button
                      className="acceptbutton"
                      onClick={() => addDriver(driver._id)}
                    >
                      Accept
                    </button>{" "}
                    <span></span>{" "}
                    <button
                      className="rejectbutton"
                      onClick={() => removeDriver(driver._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RequestedDrivers;
