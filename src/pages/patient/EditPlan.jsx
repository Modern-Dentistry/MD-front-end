import React, { useState } from "react";
import ToothSelector from "../../components/ToothSelector";
import "../../assets/style/examination.css";
import { ToastContainer, toast } from 'react-toastify';
import DropdownMenuChecklist from "../../components/DropdownChecklist";
import { useNavigate } from "react-router-dom";
import ListWithCheckbox from "../../components/list/ListWithCheckbox";
import DualList from "../../components/list/DualList";
const EditPlan = () => {
   const [selectedTeeth, setSelectedTeeth] = useState([]);
   const [mode, setMode] = useState("edit"); // Default mode is "view"
   const [selectedInsurance, setSelectedInsurance] = useState(null);
   const navigate = useNavigate();
   const [selectedCategory, setSelectedCategory] = useState(null);

   const handleCheckboxChange = (index, key, checked) => {
    console.log(`Checkbox changed at index ${index}, key: ${key}, checked: ${checked}`);
    // Update the data or perform any necessary actions here
  };

  const handleTeethSelect = (tooth) => {
    setSelectedTeeth([...selectedTeeth, tooth]);
    console.log("Selected Teeth:", selectedTeeth);
  };

  const insurances = [
    {
      id: 1,
      insuranceName: "Insurance 1",
      insuranceNo: "1234567890",
    },
  ];
  
  const insuranceOptions = insurances.map((insurance) => ({
    value: insurance.id,
    label: `${insurance.insuranceName}`,
  }));

  const handleInsuranceSelect = (selectedOption) => {
    setSelectedInsurance(selectedOption);
    console.log("Selected Insurance:", selectedOption);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
    };

  const handleSelect = (item) => {
    console.log("Selected Item:", item);
  };

   return (
     <div className="examination-container">
       <ToastContainer />
       <div className="flex justify-between">
         <div className="flex">
           <DropdownMenuChecklist
           className='flex w-8'
             options={insuranceOptions}
             onSelect={handleInsuranceSelect}
             placeholder="Sığorta seçin"
           />
         </div>
       </div>
       <div className="tooth-selector-container">
         <ToothSelector selectedTeeth={selectedTeeth} onSelect={handleTeethSelect} mode={mode} />
       </div>

       <DualList 
       categories={[
        { id: 1, name: "Category 1", count: 10 },
        { id: 2, name: "Category 2", count: 20 },
        { id: 3, name: "Category 3", count: 30 },
      ]}
columns={[
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ]}
  subCategories={[
    { name: "true", age: 28, email: "john@example.com" },
    { name: "true", age: 34, email: "jane@example.com" },
    { name: "false", age: 25, email: "alice@example.com" },
  ]}
  selectedCategory={selectedCategory}
  handleCategory={handleCategory}
  handleSelect={handleSelect}
  selectableItem={'name'}
/>
       <div className="flex justify-center items-center  rounded-md">
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

export default EditPlan;