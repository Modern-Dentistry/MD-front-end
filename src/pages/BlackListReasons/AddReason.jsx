import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import "../../assets/style/Specialities/addspeciality.css"

function AddReason() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSave = () => {
    console.log("Saved ID:", id, "Yeni ad:", name);
    navigate("/blacklist-reasons");
  };

  return (
    <div className="addSpecialityContainer">

      <div className="addSpecialityWrapper">
        
        <form className="addSpecialityForm" onSubmit={(e) => e.preventDefault()}>
        <div className="topPartForm">
          
          <label htmlFor="name">Səbəbin adı <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Səbəbin adı"
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>

          <div className="addSpecialityActions">
            <button
              type="button"
              className="cancelBtn"
              onClick={() => navigate("/blacklist-reasons")}
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

export default AddReason;
