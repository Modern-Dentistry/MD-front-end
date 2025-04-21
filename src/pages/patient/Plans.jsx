import React, { useState } from "react";
import ToothSelector from "../../components/ToothSelector";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/examination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import CompareIcon from "../../assets/icons/Compare";
import EditIcon from "../../assets/icons/Edit";
import DeleteIcon from "../../assets/icons/Delete";
import { toast } from 'react-toastify';
import DropdownMenuChecklist from "../../components/DropdownChecklist";
import { useNavigate } from "react-router-dom";
import SimpleList from "../../components/list/SimpleList";
import ListWithCheckbox from "../../components/list/ListWithCheckbox";
const Plans = () => {
   const [selectedTeeth, setSelectedTeeth] = useState([]);
   const [mode, setMode] = useState("view"); // Default mode is "view"
   const [selectedPlans, setSelectedPlans] = useState([]); // State for selected plans
   const navigate = useNavigate();

   const handleCheckboxChange = (index, key, checked) => {
    console.log(`Checkbox changed at index ${index}, key: ${key}, checked: ${checked}`);
    // Update the data or perform any necessary actions here
  };

      const plans = [
     {
       id: 1,
       planName: "Basic Cleaning",
       date: "2025-04-01",
       toothNo: 12,
       doctor: "Dr. Smith",
       price: 200,
       discountRate: 10, // in percentage
     },
     {
       id: 2,
       planName: "Root Canal",
       date: "2025-04-05",
       toothNo: 24,
       doctor: "Dr. Johnson",
       price: 300,
       discountRate: 15, // in percentage
     },
     {
       id: 3,
       planName: "Whitening",
       date: "2025-04-08",
       toothNo: 36,
       doctor: "Dr. Brown",
       price: 250,
       discountRate: 5, // in percentage
     },
   ];

   const planOptions = plans.map((plan) => ({
     value: plan.id,
     label: `${plan.planName}`,
   }));

   const handlePlanSelect = (selectedOptions) => {
     setSelectedPlans(selectedOptions);
     const selectedToothNumbers = selectedOptions.map((selectedOption) => {
      const plan = plans.find((p) => p.id === selectedOption.value);
      return plan ? plan.toothNo : null; // Ensure the plan exists
    }).filter((toothNo) => toothNo !== null); // Remove null values
  
    setSelectedTeeth(selectedToothNumbers);
     console.log("Selected Plans:", selectedOptions);
   };

   const handleCompare = () => {
    if (selectedPlans.length > 1) {
      localStorage.setItem("selectedPlans", JSON.stringify(selectedPlans));
      navigate("/patient/compare-plans"); // Use absolute path
    } else {
      toast.error("Müqayisə üçün ən azı 2 plan seçilməlidir!");
    }
  };

   return (
     <div className="examination-container">
       <div className="flex justify-between">
         <div className="flex">
           <DropdownMenuChecklist
           className='flex w-8'
             options={planOptions}
             onSelect={handlePlanSelect}
             placeholder="Select Plans"
           />
           <button className="flex bg-transparent text-[#155EEF] border rounded-lg justify-center items-center px-6">
             Müalicə
           </button>
         </div>
         <div className="flex gap-4">
           <button className="flex bg-transparent text-[#155EEF] border rounded-lg justify-center items-center px-6 hover:bg-[#155EEF] hover:text-white transition-all duration-300" onClick={() => navigate('/patient/create-plan')}>
             + Yenisini əlavə et
           </button>
           <div className="flex gap-2">
             <button onClick={handleCompare}>
               <CompareIcon />
             </button>
             <button>
               <EditIcon />
             </button>
             <button>
               <DeleteIcon />
             </button>
           </div>
         </div>
       </div>
       <div className="tooth-selector-container">
         <ToothSelector selectedTeeth={selectedTeeth} mode={mode} />
       </div>
       <div className="flex justify-center items-center border border-gray-300 rounded-md">
         {/* Render the selected plans */}
<ListWithCheckbox
  columns={[
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ]}
  onPageChange={() => {
    console.log("Page changed");
  }}
  currentPage={3}
  startPage={1}
  endPage={8}
  data={[
    { name: "true", age: 28, email: "john@example.com" },
    { name: "true", age: 34, email: "jane@example.com" },
    { name: "false", age: 25, email: "alice@example.com" },
  ]}
  checkboxDataKey={"name"}
  onCheckboxChange={handleCheckboxChange}
/>
       </div>
     </div>
   );
};

export default Plans;