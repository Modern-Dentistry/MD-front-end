import React from "react";
import "../assets/style/tooth_selector.css";

const ToothSelector = ({ selectedTeeth, onSelect, showImage = true, mode = "edit", isChild = false }) => {
  const upperJawTeeth = (!isChild) ? [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
  ] : [
    55, 54, 53, 52, 51, 61, 62, 63, 64, 65
  ]
  
  const lowerJawTeeth = (!isChild) ? [
    48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ] : [
    85, 84, 83, 82, 81, 71, 72, 73, 74,75
  ];


  return (
    <div className="flex justify-center items-center">
    <div className="tooth-selector">
      <h3 className="jaw-title">Üst çənə</h3>
      <div className="tooth-selector-grid upper-jaw">
        {upperJawTeeth.map((tooth) => (
          <div key={tooth} className="tooth-item">
            {showImage && (
              <img
                src={`/src/assets/images/teeth/${tooth}.png`} // Example path for tooth images
                alt={`Tooth ${tooth}`}
                className="tooth-image"
              />
            )}
            <button
              className={`tooth-button ${selectedTeeth.includes(tooth) ? "selected" : ""
                }`}
              onClick={() => mode === "edit" && onSelect(tooth)}
              disabled={mode === "view"}
            >
              {tooth}
            </button>
          </div>
        ))}
      </div>

      <h3 className="jaw-title">Alt çənə</h3>
      <div className="tooth-selector-grid lower-jaw">
        {lowerJawTeeth.map((tooth) => (
          <div key={tooth} className="tooth-item">
            {showImage && (
              <img
                src={`/src/assets/images/teeth/${tooth}.png`} // Example path for tooth images
                alt={`Tooth ${tooth}`}
                className="tooth-image"
              />
            )}
            <button
              className={`tooth-button ${selectedTeeth.includes(tooth) ? "selected" : ""
                }`}
              onClick={() => mode === "edit" && onSelect(tooth)}
              disabled={mode === "view"}
            >
              {tooth}
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ToothSelector;