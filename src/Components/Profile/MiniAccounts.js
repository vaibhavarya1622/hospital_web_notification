import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table } from 'reactstrap';
import { Col, CustomInput, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



const MiniAccounts = () => {

    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        axios.get('https://server.prioritypulse.co.in/hosp/accounts', {
            headers: { Authorization: localStorage.getItem("token") },
        })
            .then((res) => {
                setAccounts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    console.log(accounts);

    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("Admin");
    const [password, setPassword] = useState("");
    const [showHome, setShowHome] = useState(false);
    const [showTrack, setShowTrack] = useState(false);
    const [showPast, setShowPast] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showDriverList, setShowDriverList] = useState(false);
    const [showDriverListAction, setShowDriverListAction] = useState(false);
    const [showRequest, setShowRequest] = useState(false);
    const [showRequestAction, setShowRequestAction] = useState(false);
    const [showMiniAcco, setShowMiniAcco] = useState(false);
    const [showMiniAccoActions, setShowMiniAccoActions] = useState(false);
    const [showMiniAccoDelete, setShowMiniAccoDelete] = useState(false);
    const [showForm, SetShowForm] = useState(false);

    const data = {
        "email": email,
        "userType": userType,
        "password": password,
        "showHome": showHome,
        "showTrack": showTrack,
        "showPast": showPast,
        "showProfile": showProfile,
        "showDriverList": showDriverList,
        "showDriverListAction": showDriverListAction,
        "showRequest": showRequest,
        "showRequestAction": showRequestAction,
        "showMiniAcco": showMiniAcco,
        "showMiniAccoActions": showMiniAccoActions,
        "showMiniAccoDelete": showMiniAccoDelete
    }

    const editAcco = (e) => {

    }
 const removeAcco = (e) => {
       
console.log(e);
      
 axios
   .delete("https://server.prioritypulse.co.in/hosp/deleteMini", {
     data: {accountid:e},
     headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
   })

   .then((res) => {
     console.log(res);
   })
   .catch((err) => {
     console.log(err);
   });
    }

    const sendData = (e) => {
        console.log(data);
        axios.post('https://server.prioritypulse.co.in/hosp/createMini', data,
            {
                headers: { "Authorization": localStorage.getItem("token") }
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="miniaccount" >
            <h4 style={{ color: "#390999", fontWeight: "800", textAlign: "center" }}>Mini Accounts <span style={{ float: "right" }}>
                <button className="addbutton" onClick={() => SetShowForm(!showForm)}>+</button></span> </h4>
            <div className="driverlist">
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account, id) => {
                            return (
                                <tr key={id}>
                                    <td>{account.email}</td>
                                    <td>{account.userType}</td>
                                    <td><button className="editbutton" onClick={() => editAcco(account._id)}>Edit</button>    <span></span>
                                        <button className="deletebutton" onClick={() => removeAcco(account._id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            {showForm ?
                <div className="miniform">
                    <Form onSubmit={(e) => e.preventDefault()}  >
                        <FormGroup className="formgroup" row>
                            <Label sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup className="formgroup" row>
                            <Label sm={3}>Password</Label>
                            <Col sm={9}>
                                <Input type="password" name="password" id="examplePassword" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup className="formgroup" row>
                            <Label sm={3}>UserType</Label>
                            <Col sm={9}>
                                <Input type="select" name="select" id="exampleSelect" value={userType} onChange={(e) => setUserType(e.target.value)}>
                                    <option>admin</option>
                                    <option>mini</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup className="formgroup" row>
                            <Label sm={3}>Controls</Label>
                            <Col sm={9} style={{ textAlign: "start" }}>
                                <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="Home Page" value={showHome} onChange={(e) => setShowHome(!showHome)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="TrackAmbulance Page" value={showTrack} onChange={(e) => setShowTrack(!showTrack)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="PastRide Page" value={showPast} onChange={(e) => setShowPast(!showPast)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Profile Page" value={showProfile} onChange={(e) => setShowProfile(!showProfile)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Driver List" value={showDriverList} onChange={(e) => setShowDriverList(!showDriverList)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Driver Action" value={showDriverListAction} onChange={(e) => setShowDriverListAction(!showDriverListAction)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Driver Request" value={showRequest} onChange={(e) => setShowRequest(!showRequest)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Request Action" value={showRequestAction} onChange={(e) => setShowRequestAction(!showRequestAction)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Mini Accounts" value={showMiniAcco} onChange={(e) => setShowMiniAcco(!showMiniAcco)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Mini Account Action" value={showMiniAccoActions} onChange={(e) => setShowMiniAccoActions(!showMiniAccoActions)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Delete Mini Account" value={showMiniAccoDelete} onChange={(e) => setShowMiniAccoDelete(!showMiniAccoDelete)} />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }} >
                                <button className="submitbutton" onClick={() => sendData()} >Submit</button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                : null}
        </div>
    )
}

export default MiniAccounts