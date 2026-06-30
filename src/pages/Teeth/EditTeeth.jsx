import React, { useRef, useState, useEffect } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
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

const parseFDINumber = (toothNo) => {
  const t = Number(toothNo);
  if (t >= 11 && t <= 18) return { type: "ADULT", location: "TOP_RIGHT", num: t - 10 };
  if (t >= 21 && t <= 28) return { type: "ADULT", location: "TOP_LEFT", num: t - 20 };
  if (t >= 31 && t <= 38) return { type: "ADULT", location: "BOTTOM_LEFT", num: t - 30 };
  if (t >= 41 && t <= 48) return { type: "ADULT", location: "BOTTOM_RIGHT", num: t - 40 };
  if (t >= 51 && t <= 55) return { type: "CHILD", location: "TOP_RIGHT", num: t - 50 };
  if (t >= 61 && t <= 65) return { type: "CHILD", location: "TOP_LEFT", num: t - 60 };
  if (t >= 71 && t <= 75) return { type: "CHILD", location: "BOTTOM_LEFT", num: t - 70 };
  if (t >= 81 && t <= 85) return { type: "CHILD", location: "BOTTOM_RIGHT", num: t - 80 };
  return null;
};

const EditTeeth = () => {
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedTooth, fetchByToothNo, updateTooth, loading } =
    useTeethStore();

  useEffect(() => {
    if (id) {
      fetchByToothNo(id);
    }
  }, [id, fetchByToothNo]);

  useEffect(() => {
    if (selectedTooth) {
      const parsed = parseFDINumber(selectedTooth.toothNo);
      if (parsed) {
        setSelectedNumber(parsed.num.toString());
        setSelectedType(
          Object.keys(typeMap).find(
            (key) => typeMap[key] === parsed.type
          ) || ""
        );
        setSelectedLocation(
          Object.keys(locationMap).find(
            (key) => locationMap[key] === parsed.location
          ) || ""
        );
      } else {
        setSelectedNumber(selectedTooth.toothNo?.toString() || "");
        setSelectedType(
          Object.keys(typeMap).find(
            (key) => typeMap[key] === selectedTooth.toothType
          ) || ""
        );
        setSelectedLocation(
          Object.keys(locationMap).find(
            (key) => locationMap[key] === selectedTooth.toothLocation
          ) || ""
        );
      }
    }
  }, [selectedTooth]);

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
      id: selectedTooth?.id || id,
      toothNo: calculatedToothNo,
      toothType: type,
      toothLocation: location,
    };

    try {
      await updateTooth(payload);
      toast.success("Diş məlumatı yeniləndi!");

      setTimeout(() => {
        navigate("/teeth");
      }, 1500);
    } catch (err) {
      toast.error("Xəta baş verdi!");
    }
  };

  if (loading || !selectedTooth) {
    return (
      <div style={{ padding: 20, fontSize: 18 }}>Diş məlumatı yüklənir...</div>
    );
  }

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
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              setSelectedNumber("");
            }}
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
          <button
            type="button"
            className="addteeth-cancel-btn"
            onClick={() => navigate("/teeth")}>
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

export default EditTeeth;
