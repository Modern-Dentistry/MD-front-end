import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import "../../assets/style/Specialities/addspeciality.css"

function AddPermission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSave = () => {
    console.log("Saved ID:", id, "Yeni ad:", name);
    navigate("/permissions");
  };

  return (
    <div className="addSpecialityContainer">

      <div className="addSpecialityWrapper">
        
        <form className="addSpecialityForm" onSubmit={(e) => e.preventDefault()}>
        <div className="topPartForm">
          
          <label htmlFor="name">İcazənin adı <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="İcazənin adı"
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>

          <div className="addSpecialityActions">
            <button
              type="button"
              className="cancelBtn"
              onClick={() => navigate("/permissions")}
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

export default AddPermission;
