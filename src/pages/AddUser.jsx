import React, { useEffect } from "react";

import TitleUpdater from "../components/TitleUpdater";
import UserForm from "../components/UserForm";
import { useCreateWorker } from "../hooks/useWorkers";
import BeatLoader from 'react-spinners/BeatLoader'; 
import { toast } from "react-toastify";

function AddUser() {
    const { mutate, isPending, isError, isSuccess } = useCreateWorker();

    const handleSubmit = (formData) => {
        mutate(formData);
    };

    useEffect(() => {
        if (isError) {
            toast.error("An error occurred while creating the user.");
        }
        if (isSuccess) {
            toast.success("Uğurla yaradıldı");
        }
    }, [isError, isSuccess]);

    return (
        <div className="relative">
            <TitleUpdater title={"Add User"} />

            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] bg-white/10 z-10 rounded-lg">
                   <BeatLoader />
                </div>
            )}

            <div className={`${isPending ? "blur-sm pointer-events-none" : ""}`}>
                <UserForm mode="create" onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default AddUser;