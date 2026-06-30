import React, { useRef, useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/Teeth/addteeth.css";
import useTeethStore from "../../../stores/teethStore";

const toothTypes = ["Yetkin", "Uşaq"];
const locations = ["Üst sol", "Üst sağ", "Alt sol", "Alt sağ"];

const typeMap = {
  Yetkin: "ADULT",
  Uşaq: "CHILD",
};

const locationMap = {
  "Üst sol": "TOP_LEFT",
  "Üst sağ": "TOP_RIGHT",
  "Alt sol": "BOTTOM_LEFT",
  "Alt sağ": "BOTTOM_RIGHT",
};

const toothTypeCountMap = {
  ADULT: 8,
  CHILD: 5,
};

const calculateFDINumber = (type, location, num) => {
  const n = Number(num);
  if (type === "ADULT") {
    if (location === "TOP_RIGHT") return 10 + n;
    if (location === "TOP_LEFT") return 20 + n;
    if (location === "BOTTOM_LEFT") return 30 + n;
    if (location === "BOTTOM_RIGHT") return 40 + n;
  } else if (type === "CHILD") {
    if (location === "TOP_RIGHT") return 50 + n;
    if (location === "TOP_LEFT") return 60 + n;
    if (location === "BOTTOM_LEFT") return 70 + n;
    if (location === "BOTTOM_RIGHT") return 80 + n;
  }
  return n;
};

const AddTeeth = () => {
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  const { addTooth, loading } = useTeethStore();
  const navigate = useNavigate();

  const maxToothNumber = selectedType
    ? toothTypeCountMap[typeMap[selectedType]]
    : 0;
  const toothNumbers = Array.from({ length: maxToothNumber }, (_, i) =>
    (i + 1).toString()
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    fileInputRef.current.value = "";
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedNumber || !selectedType || !selectedLocation) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }

    const type = typeMap[selectedType];
    const location = locationMap[selectedLocation];
    const calculatedToothNo = calculateFDINumber(type, location, selectedNumber);

    const payload = {
      toothNo: calculatedToothNo,
      toothType: type,
      toothLocation: location,
    };

    try {
      await addTooth(payload);
      toast.success("Diş uğurla əlavə olundu!");

      // 1.5 saniyə sonra yönləndirmə
      setTimeout(() => {
        navigate("/teeth");
      }, 1500);

      setSelectedNumber("");
      setSelectedType("");
      setSelectedLocation("");
      setImages([]);
    } catch (err) {
      toast.error("Xəta baş verdi!");
    }
  };

  return (
    <div className="addTeethContainer">
      <form className="addteeth-form" onSubmit={handleSubmit}>
        <div className="addteeth-row">
          <label>
            Dişin növü <span className="addteeth-required">*</span>
          </label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setSelectedNumber("");
            }}
            required>
            <option value="">Seçin</option>
            {toothTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="addteeth-row">
          <label>
            Yeri <span className="addteeth-required">*</span>
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required>
            <option value="">Seçin</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="addteeth-row">
          <label>
            Dişin nömrəsi <span className="addteeth-required">*</span>
          </label>
          <select
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            required
            disabled={!selectedType || !selectedLocation}>
            <option value="">Seçin</option>
            {toothNumbers.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="addteeth-row imagesRowToUploadTeeth">
          <label>Şəkil</label>
          <div className="addteeth-upload-box">
            <input
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="addteeth-upload-btn"
              onClick={() => fileInputRef.current.click()}>
              <FiUpload style={{ marginRight: 8 }} /> Dişin şəklini yükləyin
            </button>
          </div>
          {images.length > 0 && (
            <div className="addteeth-images-list">
              {images.map((img, idx) => (
                <div className="addteeth-image-item" key={idx}>
                  <img
                    src={URL.createObjectURL(img)}
                    alt="diş şəkli"
                    className="addteeth-thumb"
                  />
                  <button
                    type="button"
                    className="addteeth-remove-btn"
                    onClick={() => handleRemoveImage(idx)}
                    title="Sil">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="addteeth-actions">
          <button type="button" className="addteeth-cancel-btn">
            İmtina et
          </button>
          <button
            type="submit"
            className="addteeth-save-btn"
            disabled={loading}>
            {loading ? "Yüklənir..." : "Yadda saxla"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default AddTeeth;
