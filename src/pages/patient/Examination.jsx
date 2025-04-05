import React, { useState } from "react";
import ToothSelector from "../../components/ToothSelector";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/examination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const Examination = () => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [mode, setMode] = useState("view");
  const [date, setDate] = useState();
  const [examinationType, setExaminationType] = useState();

  const handleToothSelect = (tooth) => {
    setSelectedTeeth((prevSelected) =>
      prevSelected.includes(tooth)
        ? prevSelected.filter((t) => t !== tooth)
        : [...prevSelected, tooth]
    );
  };

  const handleModeToggle = () => {
    if (mode === "view") {
      setSelectedTeeth([]);
    }
    if (mode === "edit") {
      // GET FROM API
      setSelectedTeeth([]);
    }
    setMode((prevMode) => (prevMode === "view" ? "edit" : "view"));
  };

  const handleDelete = () => {
    // DELETE FROM API
  }

  const submitExamination = (selectedType) => {
    setExaminationType(selectedType);
    console.log({ selectedTeeth, date, examinationType });
  }


  return (
    <div className="examination-container">
      <div className="flex justify-between items-center">
        {mode === "view" ? (
          <>
            <CustomDropdown
              className="max-w-60"
              value={date?.target.value}
              placeholder="Tarix seçin"
              onChange={(selectedDate) => setDate(selectedDate)}
              options={[
                { value: "2023-01-01", label: "January 1, 2023" },
                { value: "2023-02-01", label: "February 1, 2023" },
                { value: "2023-03-01", label: "March 1, 2023" },
              ]} // Example date options
              // disabled={selectedTeeth.length === 0} // Disable if no tooth is selected
            />
          </>
        ) : (
          <CustomDropdown
            className="max-w-60"
            value={examinationType}
            placeholder="Müayinə seçin"
            onChange={(selectedType) => {
              submitExamination(selectedType);
              handleModeToggle();
            }}
            options={[
              { value: "type1", label: "Type 1" },
              { value: "type2", label: "Type 2" },
              { value: "type3", label: "Type 3" },
            ]} // Example examination types
            disabled={selectedTeeth.length === 0} // Disable if no tooth is selected
          />
        )}
        <div className="flex gap-3">
          {mode === "view" ? (
            <>
            <button onClick={handleModeToggle}>
              <FontAwesomeIcon icon={faPen} />
            </button>
                  <button onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  </>
          ) : null}
          {/* <button>
            <FontAwesomeIcon icon={faTrash} />
          </button> */}
        </div>
      </div>
      <div className={`tooth-selector-container ${(mode === 'view' && !date) ? 'opacity-50 pointer-events-none' : ''}`}>
        <ToothSelector 
          selectedTeeth={selectedTeeth} 
          onSelect={handleToothSelect} 
          mode={mode}
        />
      </div>
      <div className="flex justify-center items-center border border-gray-300 rounded-md"></div>
    </div>
  );
};

export default Examination;