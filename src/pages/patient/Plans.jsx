import React, { useState } from "react";
import ToothSelector from "../../components/ToothSelector";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/examination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const Plans = () => {
   const [selectedTeeth, setSelectedTeeth] = useState([]);
   const [mode, setMode] = useState("view"); // Default mode is "view"
   const [date, setDate] = useState();
   const [examinationType, setExaminationType] = useState();
 

  return (
    <div className="examination-container">

      <div className="tooth-selector-container">
        <ToothSelector selectedTeeth={selectedTeeth}  mode={mode} />
      </div>
      <div className="flex justify-center items-center border border-gray-300 rounded-md"></div>
    </div>
  );
};

export default Plans;