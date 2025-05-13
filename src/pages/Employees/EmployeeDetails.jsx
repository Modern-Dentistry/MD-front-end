import React, { useState } from "react";
import { useWorker, useUpdateWorker, useDeleteWorker } from "../../hooks/useWorkers";
import TitleUpdater from "../../components/TitleUpdater";
import UserForm from "../../components/UserForm";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BeatLoader from 'react-spinners/BeatLoader';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useWorker(id);
  const { mutate: updateWorker, isPending: isUpdating } = useUpdateWorker();
  const { mutate: deleteWorker, isPending: isDeleting } = useDeleteWorker();

  const handleUpdate = (formData) => {
    const updateData = {
      ...formData,
      id: id
    };
    
    updateWorker(updateData, {
      onSuccess: () => {
        toast.success("User updated successfully");
        navigate("/users");
      },
      onError: () => {
        toast.error("Failed to update user");
      }
    });
  };

  const handleDelete = () => {
      deleteWorker(id, {
        onSuccess: () => {
          toast.success("User deleted successfully");
          navigate("/users");
        },
        onError: () => {
          toast.error("Failed to delete user");
        }
      });
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <BeatLoader />
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center p-4">
      Error: {error.message}
    </div>
  );

  return (
    <div className="relative">
      <TitleUpdater title={"View User"} />
      
      {(isUpdating || isDeleting) && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] bg-white/10 z-10 rounded-lg">
          <BeatLoader />
        </div>
      )}

      <div className={`${(isUpdating || isDeleting) ? "blur-sm pointer-events-none" : ""}`}>
        <UserForm 
          mode="view" 
          userData={data}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default EmployeeDetails;
