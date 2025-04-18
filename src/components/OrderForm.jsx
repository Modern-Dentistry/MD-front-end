import React from "react";
import { useState } from "react";
import '../assets/style/form.css';
import CustomDropdown from "./CustomDropdown";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ToothSelector from "./ToothSelector";
import MultiFileForm from "./MultiFileForm";
const OrderForm = ({ initialData, mode="create", onSubmit, onCancel }) => {
    const { register, handleSubmit, setValue, control } = useForm({
        defaultValues: initialData,
    });

    // Mock data for dropdowns - replace with actual data from your backend
    const doctors = [
        { value: '1', label: 'Dr. John Doe' },
        { value: '2', label: 'Dr. Jane Smith' },
    ];

    const technicians = [
        { value: '1', label: 'Tech 1' },
        { value: '2', label: 'Tech 2' },
    ];

    const patients = [
        { value: '1', label: 'Patient 1' },
        { value: '2', label: 'Patient 2' },
    ];

    const workTypes = [
        { value: '1', label: 'Type 1' },
        { value: '2', label: 'Type 2' },
    ];

    const colors = [
        { value: '1', label: 'Red' },
        { value: '2', label: 'Blue' },
    ];

    const furniture = [
        { value: '1', label: 'Furniture 1' },
        { value: '2', label: 'Furniture 2' },
    ];
    const [selectedTeeth, setSelectedTeeth] = useState([11]);
    const [isChild, setIsChild] = useState(true);

    const handleToothSelect = (tooth) => {
      setSelectedTeeth((prevSelected) =>
        prevSelected.includes(tooth)
          ? prevSelected.filter((t) => t !== tooth)
          : [...prevSelected, tooth]
      );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
               <div className="flex flex-col gap-2 border border-[#E5E7EB] rounded-lg p-6 bg-white">
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="doctor">Həkim <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <CustomDropdown
                        options={doctors}
                        value={initialData?.doctor}
                        onChange={(value) => setValue('doctor', value)}
                        placeholder="Həkim seçin"
                        name="doctor"
                        disabled={mode === 'view'}
                    />
                    </div>
                </div>

                {/* Technician Dropdown */}
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="technician">Texnik <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <CustomDropdown
                        options={technicians}
                        value={initialData?.technician}
                        onChange={(value) => setValue('technician', value)}
                        placeholder="Texnik seçin"
                        name="technician"
                        disabled={mode === 'view'}
                    />
                    </div>
                </div>

                {/* Patient Dropdown */}
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="patient">Pasiyent <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <CustomDropdown
                        options={patients}
                        value={initialData?.patient}
                        onChange={(value) => setValue('patient', value)}
                        placeholder="Pasiyent seçin"
                        name="patient"
                        disabled={mode === 'view'}
                    />
                    </div>
                </div>

                {/* Order Date */}
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="orderDate">Sifariş tarixi <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <input
                        id="orderDate"
                        type="date"
                        {...register('orderDate')}
                        readOnly={mode === 'view'}
                        className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${mode === 'view' ? 'bg-gray-200' : ''}`}
                    />
                    </div>
                </div>

                {/* Inspection Date */}
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="inspectionDate">Yoxlanılma tarixi <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <input
                        id="inspectionDate"
                        type="date"
                        {...register('inspectionDate')}
                        readOnly={mode === 'view'}
                        className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${mode === 'view' ? 'bg-gray-200' : ''}`}
                    />
                    </div>
                </div>

                {/* Delivery Date */}
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="deliveryDate">Təhvil tarixi <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <input
                        id="deliveryDate"
                        type="date"
                        {...register('deliveryDate')}
                        readOnly={mode === 'view'}
                        className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${mode === 'view' ? 'bg-gray-200' : ''}`}
                    />
                    </div>
                </div>

                {/* Work Type Dropdown */}
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="workType">İşin növü <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <CustomDropdown
                        options={workTypes}
                        value={initialData?.workType}
                        onChange={(value) => setValue('workType', value)}
                        placeholder="İşin növünü seçin"
                        name="workType"
                        disabled={mode === 'view'}
                    />
                    </div>
                </div>

                {/* Color Dropdown */}
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="color">Rəng <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <CustomDropdown
                        options={colors}
                        value={initialData?.color}
                        onChange={(value) => setValue('color', value)}
                        placeholder="Rəng seçin"
                        name="color"
                        disabled={mode === 'view'}
                    />
                    </div>
                </div>

                {/* Furniture Dropdown */}
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="furniture">Qarnitur <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                    <CustomDropdown
                        options={furniture}
                        value={initialData?.furniture}
                        onChange={(value) => setValue('furniture', value)}
                        placeholder="Qarnitur seçin"
                        name="furniture"
                        disabled={mode === 'view'}
                    />
                    </div>
                </div>


            {/* Notes - Larger Textbox */}
            <div className="flex justify-between items-center gap-2">
                <label htmlFor="notes">Qeyd</label>
                <div className="w-[950px]">
                <textarea
                    id="notes"
                    {...register('notes')}
                    readOnly={mode === 'view'}
                    className={`w-full h-32 border border-[#D4DCE8] rounded-lg px-4 py-2 resize-none ${mode === 'view' ? 'bg-gray-200' : ''}`}
                    placeholder="Qeydlər..."
                />
                </div>
            </div>

            <div className="flex justify-between items-center gap-2">
                    <label htmlFor="furniture">Qarnitur <span className="text-red-500">*</span></label>
                    <div className="w-[950px]">
                 <MultiFileForm />
                    </div>
                </div>
            </div>

            <div className="flex flex-col border border-[#E5E7EB] bg-white rounded-lg w-full p-4 gap-2">
              <h1 className="text-lg font-bold">Diş qrafiki</h1>
              <h2>Təsirə məruz qalan dişlər və müalicə sahələri</h2>

              <div className="flex items-center justify-around border border-[#E5E7EB] rounded-lg w-[198px] h-[40px]">
                <button 
                    className={`w-[90px] h-[32px] rounded-lg ${!isChild ? 'bg-[#155EEF] text-white' : ''}`}
                    onClick={() => {setIsChild(false); setSelectedTeeth([]);}}
                >
                    Yetkin
                </button>
                <button 
                    className={`w-[90px] h-[32px] rounded-lg ${isChild ? 'bg-[#155EEF] text-white' : ''}`}
                    onClick={() => {setIsChild(true); setSelectedTeeth([]);}}
                >
                    Uşaq
                </button>
              </div>
            <div>
              <ToothSelector showImage={false} selectedTeeth={selectedTeeth} onSelect={handleToothSelect} isChild={isChild}/>
            </div>
            </div>

          <div className="self-end flex gap-4 m-4">
            <button className="flex items-center justify-center px-4 py-2 border text-[#155EEF] border-[#155EEF] rounded-lg hover:bg-gray-100 w-[184px] h-[44px] gap-2">
                <FontAwesomeIcon icon={faXmark} />
                Ləğv et
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-[#155EEF] text-white rounded-lg hover:bg-blue-600 w-[184px] h-[44px] gap-2">
                <FontAwesomeIcon icon={faCheck} />
                Yadda saxla
            </button>
          </div>
        </form>
    );
};

export default OrderForm;