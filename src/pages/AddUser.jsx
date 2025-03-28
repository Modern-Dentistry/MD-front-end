import React, { useState } from "react";
import "../assets/style/add_user.css";

import TitleUpdater from "../components/TitleUpdater";
import Sidebar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import ImageUploader from "../components/ProfileImage";
function AddUser() {

    return (
        <div className="add_user">
        <Sidebar />
        <TitleUpdater title={"Add User"} />
        <div className="form_container">
            <UserForm mode="create"/>
            </div>
        </div>

    );
    }

export default AddUser;
