import React, { useState } from "react";

import TitleUpdater from "../components/TitleUpdater";
import Sidebar from "../components/layout/Sidebar";
import UserForm from "../components/UserForm";
import ImageUploader from "../components/ProfileImage";
function ViewUser() {
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
      };

    const permissions  = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
        { label: "Option 4", value: "option4" },
        { label: "Option 5", value: "option5" },
      ];


    return (
        <div>
        <TitleUpdater title={"View User"} />
        <div>
            <UserForm mode="view" userData={userData}/>
            </div>
        </div>

    );
    }

export default ViewUser;
