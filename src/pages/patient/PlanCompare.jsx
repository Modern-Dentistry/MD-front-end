import React, { useEffect, useState } from "react";
import EditIcon from "../../assets/icons/Edit";
import DeleteIcon from "../../assets/icons/Delete";
import { useNavigate } from "react-router-dom";
const PlanCompare = () => {
  const navigate = useNavigate();
  const [selectedPlans, setSelectedPlans] = useState([]);
console.log('RENDERERDDDD')
  useEffect(() => {
    const storedPlans = localStorage.getItem("selectedPlans");
    if (storedPlans) {
      setSelectedPlans(JSON.parse(storedPlans)); // Parse and set the plans
    }
  }, []);



  return (
    <div className="flex">

        {selectedPlans.map((plan) => ( 
                 <div className="flex flex-col w-full h-52 rounded-lg border overflow-auto border-[#CDD5DF] m-1">

            <div className="flex h-1/4 w-full bg-[#155EEF] items-center text-white px-2 justify-between">
            {plan.label}
            <div className="flex gap-2">
                
            <button className="flex w-[40px] h-[40px] bg-white border rounded-lg items-center justify-center"
            onClick={() => navigate(`/patient/edit-plan/${plan.id}`)}
            >
               <EditIcon />
             </button>
             <button className="flex w-[40px] h-[40px] bg-white border rounded-lg items-center justify-center">
               <DeleteIcon />
             </button>
            </div>
            </div>
            <ul>
                        <li>{plan.label}</li>

                        
                        </ul>
            </div>
         

        ))}
    </div>
  );
};

export default PlanCompare;