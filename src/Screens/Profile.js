import React from "react";
import Header from "../Components/Myheader/Header";
import DriversList from "../Components/Profile/DriversList";
import MiniAccounts from "../Components/Profile/MiniAccounts";
import RequestedDrivers from "../Components/Profile/RequestedDrivers";
import { Container, Row, Col } from "reactstrap";
import "../css/Profile.css";

const DriverProfile = () => {
  return (
    <div>
      <Header location="profile" />
      <div className="driverprofile">
        <Container>
          <Row style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
            <Col lg={4} className="profilecoumn">
              <RequestedDrivers />
            </Col>
            <Col lg={4} className="profilecoumn">
              <DriversList />
            </Col>
            <Col lg={4} className="profilecoumn">
              <MiniAccounts />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DriverProfile;
