import React, { useState } from "react";

import TitleUpdater from "../components/TitleUpdater";
import Sidebar from "../components/layout/Sidebar";
import PatientForm from "../components/PatientForm";

function AddPatient() {
    return (
        <div>
            <PatientForm mode="create"/>
            </div>
    );
    }
export default AddPatient;
