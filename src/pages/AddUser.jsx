import React, { useState } from "react";
import "../assets/style/add_user.css";

import TitleUpdater from "../components/TitleUpdater";
import Sidebar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import ImageUploader from "../components/ImageUploader";
function AddUser() {
    const userData = {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        permissions: {
          permission1: true,
          permission2: true,
          permission3: true,
          permission4: false,
          permission5: true,
        },
        // Other user data fields...
      };
    return (
        <div className="add_user">
        <Sidebar />
        <TitleUpdater title={"Add User"} />
        <div className="form_container">
            <UserForm mode="view" userData={userData}/>
            </div>
        </div>

    );
    }

export default AddUser;
