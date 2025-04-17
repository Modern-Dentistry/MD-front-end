import React, { useState, useEffect, use } from 'react';
import ProfileImage from '../../components/ProfileImage';
import '../../assets/style/form.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PatientForm from '../../components/PatientForm';
import { usePatient, useUpdatePatient, useDeletePatient } from '../../hooks/usePatients';
import { useParams } from 'react-router-dom';
import EditIcon from '../../assets/icons/edit';
import DeleteIcon from '../../assets/icons/delete';
import BlurLoader from '../../components/layout/BlurLoader';

const General = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { data: patient, isLoading, error } = usePatient(id);
  const { mutate: deletePatient, isPending: deletingPatient } = useDeletePatient();
  const { mutate: updatePatient, isPending: updatingPatient } = useUpdatePatient();

  // Handle Edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle Delete
  const handleDelete = () => {
      deletePatient(id, {
        onSuccess: () => {
          toast.success("Patient deleted successfully");
        },
        onError: () => {
          toast.error("Error deleting patient");
        },
      });
  };

  // Handle Form Submit
  const handleFormSubmit = (formData) => {
    formData.id = id; // Ensure the ID is included in the form data
    updatePatient(formData, {
      onSuccess: () => {
        toast.success("Patient updated successfully");
        setIsEditing(false); // Close the form after successful submission
      },
      onError: () => {
        toast.error("Error updating patient");
      },
    });
  };

  // Handle Cancel
  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className='flex flex-col gap-2'>
        <PatientForm 
          initialData={patient}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          mode="edit"
        />
      </div>
    );
  }

  return (
    <BlurLoader isLoading={isLoading || updatingPatient}>
    <div className='flex flex-col gap-2'>
      <div className='flex self-end gap-4'>
        <button onClick={handleEdit}>
          <EditIcon />
        </button>
        <button onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
      <div className="input-container">
        <div className='left'>
          <div className='flex flex-col gap-3 bg-[#D1E0FF] rounded-lg'>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                id="status"
                type="text"
                name="status"
                value={patient?.permissions}
                readOnly
                className='readonly'
              />
            </div>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                id="id"
                type="text"
                name="id"
                value={patient?.id}
                readOnly
                className='readonly'
              />
            </div>
            <div className="form-group">
              <label htmlFor="registrationDate">Qeydiyyat Tarixi</label>
              <input
                id="registrationDate"
                type="date"
                name="registrationDate"
                value={patient?.registrationDate || ''} // Replace with actual registration date
                readOnly
                className='readonly'
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastEdited">Son redakte</label>
              <input
                id="lastEdited"
                type="date"
                name="lastEdited"
                value={patient?.lastEdited || ''} // Replace with actual last edited date
                readOnly
                className='readonly'
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Ad</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={patient?.name}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Soyad</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={patient?.surname}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="fatherName">Ata adı</label>
            <input
              id="fatherName"
              type="text"
              name="fatherName"
              value={patient?.patronymic}
              readOnly
              className='readonly'
            />
          </div>
    
          <div className="form-group">
            <label htmlFor="gender">Cinsiyyət</label>
            <input
              id="gender"
              type="text"
              name="gender"
              value={patient?.genderStatus}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="finCode">FIN kod</label>
            <input
              id="finCode"
              type="text"
              name="finCode"
              value={patient?.finCode}
              readOnly
              className='readonly'
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Doğum tarixi</label>
            <input
              id="birthDate"
              type="date"
              name="birthDate"
              value={patient?.dateOfBirth}
              readOnly
              className='readonly'
            />
          </div>

          <div className="form-group">
            <label htmlFor="priceCategory">Qiymət kateqoriyası</label>
            <input
              id="priceCategory"
              type="text"
              name="priceCategory"
              value={patient?.priceCategoryStatus}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="specialization">İxtisas</label>
            <input
              id="specialization"
              type="text"
              name="specialization"
              value={patient?.specializationStatus}
              readOnly
              className='readonly'
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctor">Həkim</label>
            <input
              id="doctor"
              type="text"
              name="doctor"
              value={patient?.doctor_id}
              readOnly
              className='readonly'
            />
          </div>

        </div>

        <div className='right'>
          <div className="form-group">
            <label htmlFor="isVip">VIP</label>
            <input
              id="isVip"
              type="text"
              name="isVip"
              value={patient?.isVip}
              readOnly
              className='readonly'
            />
          </div>

          <div className="form-group">
            <label htmlFor="isBlacklisted">Qara siyahı</label>
            <input
              id="isBlacklisted"
              type="text"
              name="isBlacklisted"
              value={patient?.isBlacklisted}
              readOnly
              className='readonly'
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber1">Mobil nömrə 1</label>
            <input
              id="mobileNumber1"
              type="tel"
              name="mobileNumber1"
              value={patient?.mobileNumber1}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mobileNumber2">Mobil nömrə 2</label>
            <input
              id="mobileNumber2"
              type="tel"
              name="mobileNumber2"
              value={patient?.mobileNumber2}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mobileNumber3">Mobil nömrə 3</label>
            <input
              id="mobileNumber3"
              type="tel"
              name="mobileNumber3"
              value={patient?.mobileNumber3}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="whatsappNumber">WhatsApp nömrəsi</label>
            <input
              id="whatsappNumber"
              type="tel"
              name="whatsappNumber"
              value={patient?.whatsappNumber}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="workPhone">İş telefonu</label>
            <input
              id="workPhone"
              type="tel"
              name="workPhone"
              value={patient?.workPhone}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="homePhone">Ev telefonu</label>
            <input
              id="homePhone"
              type="tel"
              name="homePhone"
              value={patient?.homePhone}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">E-poçt ünvanı</label>
            <input
              id="email"
              type="email"
              name="email"
              value={patient?.email}
              readOnly
              className='readonly'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="homeAddress">Ev ünvanı</label>
            <input
              id="homeAddress"
              type="text"
              name="homeAddress"
              value={patient?.homeAddress}
              readOnly
              className='readonly'
            />
          </div>
        </div>
      </div>
    </div>
    </BlurLoader>
  );
};

export default General;