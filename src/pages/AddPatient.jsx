import React, { useState } from "react";

import TitleUpdater from "../components/TitleUpdater";
import Sidebar from "../components/layout/Sidebar";
import PatientForm from "../components/PatientForm";

function AddPatient() {
    const handleSubmit = (data) => {
        console.log(data);
    }
    return (
        <div>
            <PatientForm mode="create" onSubmit={handleSubmit}/>
            </div>
    );
    }
export default AddPatient;
