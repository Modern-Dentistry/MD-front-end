import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import "../../assets/style/Specialities/editspeciality.css"

function EditOrderStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSave = () => {
    console.log("Saved ID:", id, "Yeni ad:", name);
    navigate("/specialities");
  };

  return (
    <div className="editSpecialityContainer">

      <div className="editSpecialityWrapper">
        
        <form className="editSpecialityForm" onSubmit={(e) => e.preventDefault()}>
        <div className="topPartForm">
          
          <label htmlFor="name">Statusun adı <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Statusun adı"
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>

          <div className="editSpecialityActions">
            <button
              type="button"
              className="cancelBtn"
              onClick={() => navigate("/specialities")}
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

export default EditOrderStatus;
