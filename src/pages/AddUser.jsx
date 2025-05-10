import React, { useEffect } from "react";
import TitleUpdater from "../components/TitleUpdater";
import UserForm from "../components/UserForm";
import { useCreateWorker } from "../hooks/useWorkers";
import BeatLoader from 'react-spinners/BeatLoader'; 
import { toast } from "react-toastify";
import { useWorkers } from "../hooks/useWorkers";
import { useNavigate } from "react-router-dom";
function AddUser() {
    const navigate = useNavigate();
    const { mutate, isPending, isError, isSuccess } = useCreateWorker();

    const handleSubmit = (formData) => {
        mutate(formData);
    };

    useEffect(() => {
        if (isError) {
            toast.error("Xəta baş verdi");
        }
        if (isSuccess) {
            toast.success("Uğurla yaradıldı");
            navigate("/users");
            
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
                <UserForm mode="create" onSubmit={handleSubmit} />
        </div>
    );
}

export default AddUser;