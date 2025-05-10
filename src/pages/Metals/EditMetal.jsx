import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import "../../assets/style/Metals/editmetals.css"

function EditMetal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSave = () => {
    console.log("Saved ID:", id, "Yeni ad:", name);
    navigate("/metals");
  };

  return (
    <div className="editMetalContainer">

      <div className="editMetalWrapper">
        
        <form className="editMetalForm" onSubmit={(e) => e.preventDefault()}>
        <div className="topPartForm">
          
          <label htmlFor="name">Metalın adı: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Metalın adı"
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>

          <div className="editMetalActions">
            <button
              type="button"
              className="cancelBtn"
              onClick={() => navigate("/metals")}
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

export default EditMetal;
