import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import "../../assets/style/AcademicDegrees/editacademicdegree.css"

function EditAcademicDegrees() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSave = () => {
    console.log("Saved ID:", id, "Yeni ad:", name);
    navigate("/AcademicDegreess");
  };

  return (
    <div className="editAcademicDegreesContainer">

      <div className="editAcademicDegreesWrapper">
        
        <form className="editAcademicDegreesForm" onSubmit={(e) => e.preventDefault()}>
        <div className="topPartForm">
          
          <label htmlFor="name">Elmi dərəcənin adı: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Elmi dərəcənin adı"
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>

          <div className="editAcademicDegreesActions">
            <button
              type="button"
              className="cancelBtn"
              onClick={() => navigate("/academic-degrees")}
            >
              <RxCross2 /> imtina et
            </button>
            <button
              type="submit"
              className="saveBtn"
              onClick={handleSave}
            >
              <FiCheck /> Yadda saxla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAcademicDegrees;
