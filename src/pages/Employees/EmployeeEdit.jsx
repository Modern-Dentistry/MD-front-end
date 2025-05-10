import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TitleUpdater from "../../components/TitleUpdater";
import UserForm from "../../components/UserForm";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import useWorkerStore from "../../../stores/workerStore";

function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedWorker, fetchWorkerById, editWorker, removeWorker, loading } =
    useWorkerStore();

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchWorkerById(id);
  }, [id, fetchWorkerById]);

  const handleUpdate = async (formData) => {
    setIsProcessing(true);
    try {
      await editWorker({ ...formData, id });
      toast.success("İstifadəçi uğurla yeniləndi");
      navigate("/employees");
    } catch (err) {
      toast.error("İstifadəçini yeniləmək alınmadı");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await removeWorker(id);
      toast.success("İstifadəçi uğurla silindi");
      navigate("/employees");
    } catch (err) {
      toast.error("İstifadəçini silmək alınmadı");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading || !selectedWorker) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BeatLoader />
      </div>
    );
  }

  return (
    <div className="relative">
      <TitleUpdater title={"İşçi redaktəsi"} />

      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] bg-white/10 z-10 rounded-lg">
          <BeatLoader />
        </div>
      )}

      <div className={`${isProcessing ? "blur-sm pointer-events-none" : ""}`}>
        <UserForm
          mode="edit"
          userData={selectedWorker}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default EmployeeEdit;
