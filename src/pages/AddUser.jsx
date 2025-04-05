import React, { useState } from "react";

import TitleUpdater from "../components/TitleUpdater";
import Sidebar from "../components/layout/Sidebar";
import UserForm from "../components/UserForm";
import ImageUploader from "../components/ProfileImage";
function AddUser() {

    return (
        <div>
        <Sidebar />
        <TitleUpdater title={"Add User"} />
        <div>
            <UserForm mode="create"/>
            </div>
        </div>

    );
    }

export default AddUser;
