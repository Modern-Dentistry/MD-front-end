import React, { useState, useEffect } from "react";

import TitleUpdater from "../components/TitleUpdater";
import Sidebar from "../components/layout/Sidebar";
import PatientForm from "../components/PatientForm";
import { useCreatePatient } from "../hooks/usePatients.js";
import BeatLoader from 'react-spinners/BeatLoader'; 
import { toast } from "react-toastify";

function AddPatient() {
    const { mutate, isPending, isError, error, isSuccess } = useCreatePatient();

    const handleSubmit = (data) => {
        mutate(data);
    };

    useEffect(() => {
        if (isError) {
            const errorMessage = error?.response?.data?.message || "An error occurred while creating the patient.";
            toast.error(errorMessage);
        }
        if (isSuccess) {
            toast.success("Patient created successfully.");
        }
    }, [isError, isSuccess, error]);

    return (
        <div>
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] bg-white/10 z-10 rounded-lg">
                    <BeatLoader />
                </div>
            )}

            <PatientForm mode="create" onSubmit={handleSubmit}/>
        </div>
    );
}

export default AddPatient;
