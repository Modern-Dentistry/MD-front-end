import React, { useState } from "react";

import TitleUpdater from "../components/TitleUpdater";
import Sidebar from "../components/layout/Sidebar";
import UserForm from "../components/UserForm";
import ImageUploader from "../components/ProfileImage";
import  useCreateWorker from "../hooks/useWorkers";

function AddUser() {
    const {mutate, isLoading, isError, error} = useCreateWorker();
    const handleSubmit = (formData) => {
        mutate(formData);
    }   
    return (
        <div>
        <TitleUpdater title={"Add User"} />
        <div>
            <UserForm mode="create" onSubmit={handleSubmit}/>
            </div>
        </div>

    );
    }

export default AddUser;
