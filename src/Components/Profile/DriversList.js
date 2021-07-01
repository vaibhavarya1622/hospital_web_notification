import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";

const DriversList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/hosp/alldriver", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [drivers]);

  const removeDriver = (e) => {
    axios
      .put(
        "https://server.prioritypulse.co.in/hosp/reverseDriver",
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

  return (
    <div>
      <h4 style={{ color: "#390999", fontWeight: "800", textAlign: "center" }}>
        Drivers Details
      </h4>
      <div className="driverlist">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, id) => {
              return (
                <tr key={id}>
                  <td>{driver.name}</td>
                  <td>{driver.mobileNo}</td>
                  <td>
                    <button
                      className="deletebutton"
                      onClick={() => removeDriver(driver._id)}
                    >
                      Delete
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

export default DriversList;
