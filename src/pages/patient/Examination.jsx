import React, { useState } from "react";
import ToothSelector from "../../components/ToothSelector";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/examination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import SimpleList from "../../components/list/SimpleList";
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

  const handleDelete = (id) => {
    if (id) {
      console.log('Deleting examination with ID:', id);
    } else {
      console.log('No ID provided for deletion');
    }
  }

  const handleEdit = (id) => {
    if (id) {
      console.log('Editing examination with ID:', id);
      setMode('edit');
    }
  }

  const handleView = (id) => {
    if (id) {
      console.log('Viewing examination with ID:', id);
      setMode('view');
    }
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
              value={date}
              placeholder="Tarix seçin"
              onChange={(selectedDate) => setDate(selectedDate)}
              options={[
                { value: "2023-01-01", label: "January 1, 2023" },
                { value: "2023-02-01", label: "February 1, 2023" },
                { value: "2023-03-01", label: "March 1, 2023" },
              ]}
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
            ]}
            disabled={selectedTeeth.length === 0}
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
        </div>
      </div>
      <div className={`tooth-selector-container ${(mode === 'view' && !date) ? 'opacity-50 pointer-events-none' : ''}`}>
        <ToothSelector
          selectedTeeth={selectedTeeth}
          onSelect={handleToothSelect}
          mode={mode}
        />
      </div>
      <div className="flex justify-center items-center border border-gray-300 rounded-lg">
        <SimpleList 
          columns={[
            { key: "examinationName", label: "Examination Name" },
            { key: "toothNo", label: "Tooth No" },
            { key: "doctor", label: "Doctor" },
            { key: "date", label: "Date" },
          ]} 
          onPageChange={() => { console.log('xxx') }} 
          currentPage={3} 
          startPage={1} 
          endPage={8} 
          data={ [
            {
              id: 1,
              examinationName: "Examination 1",
              toothNo: 12,
              doctor: "Dr. Smith",
              date: "2023-01-01",
            },
            {
              id: 2,
              examinationName: "Examination 2",
              toothNo: 24,
              doctor: "Dr. Johnson",
              date: "2023-02-01",
            },
            {
              id: 3,
              examinationName: "Examination 3",
              toothNo: 36,
              doctor: "Dr. Brown",
              date: "2023-03-01",
            },
          ]
        }
          enableDelete={mode === 'edit'}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Examination;