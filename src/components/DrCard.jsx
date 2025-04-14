import React from 'react';
import '../assets/style/dr-card.css'; // CSS faylını əlavə edin

const DrCard = ({ imageUrl, fullName, position }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-image-container">
        <img 
          src={imageUrl || "/images/doctor-placeholder.png"} 
          alt={fullName} 
          className="doctor-image" 
        />
      </div>
      <div className="doctor-info">
        <h3 className="doctor-name">{fullName}</h3>
        {position && <p className="doctor-position">{position}</p>}
      </div>
    </div>
  );
};

export default DrCard;