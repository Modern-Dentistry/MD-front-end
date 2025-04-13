import React, { useState } from "react";
import "../assets/style/image_uploader.css";

const ProfileImage = ({ userId, mode }) => { // Correctly destructure props
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  return (
    <div className="image-uploader">
      <div className="profile-picture">
        {image ? (
          <img src={image} alt="Profile" className="rounded-image" />
        ) : (
          <div className="placeholder">Şəkil yoxdur</div>
        )}
      </div>
      {(mode === "edit" || mode === "create") && (
         <div className="button-group">
         <label htmlFor="upload-input" className="btn btn-add">
          {image ? "Redaktə et" : "Şəkil əlavə et"} 
         </label>
         <input
           id="upload-input"
           type="file"
           accept="image/*"
           onChange={handleImageUpload}
           style={{ display: "none" }}
         />
         {image ? (
             <button className="btn btn-delete" onClick={handleImageDelete}>
             Sil
           </button>
         ): null}
       </div>
       
      )}
     
    </div>
  );
};

export default ProfileImage;