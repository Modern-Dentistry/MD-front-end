import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import "../../assets/style/Ceramics/editceramics.css"

function EditCeramics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSave = () => {
    console.log("Saved ID:", id, "Yeni ad:", name);
    navigate("/ceramics");
  };

  return (
    <div className="editCeramicsContainer">

      <div className="editCeramicsWrapper">
        
        <form className="editCeramicsForm" onSubmit={(e) => e.preventDefault()}>
        <div className="topPartForm">
          
          <label htmlFor="name">Keramikanın adı: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Keramikanın adı"
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>

          <div className="editCeramicsActions">
            <button
              type="button"
              className="cancelBtn"
              onClick={() => navigate("/Ceramicss")}
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

export default EditCeramics;
