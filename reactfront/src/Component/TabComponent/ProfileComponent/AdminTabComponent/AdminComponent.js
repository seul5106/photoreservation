import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom"

import ShowMembers from "./ShowMembers";
import ShowReservation from "./ShowReservation";

import "../../../../assets/css/admin.min.css"

const AdminComponent = () => {
    const [show, setShow] = useState(0);



    return (
        <>
            <div className="AdminContainer">
                <div className="AdminTabContainer">
                    <Link to="/Profile" onClick={() => { setShow(0) }} className={show === 0 ? "AdminTabActive AdminTab" : "AdminTab"}>Members</Link>
                    <Link to="/Profile/reservation" onClick={() => { setShow(1) }} className={show === 1 ? "AdminTabActive AdminTab" : "AdminTab"}>Reservation</Link>
                </div>

                <div className="AdminContentContainer">
                    <Routes>
                        <Route path="/" element={<ShowMembers />} />
                        <Route path="/reservation" element={<ShowReservation />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default AdminComponent;