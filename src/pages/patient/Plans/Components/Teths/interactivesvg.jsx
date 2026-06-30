import React, { useState, useEffect } from "react";
import { Button, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, CloseOutlined } from "@ant-design/icons";

const InteractiveSVG = ({
  data = [],
  categoryCode = null,   // 🔥 Yeni
  width = 110,
  height = 110,
  viewBox = "0 0 150 150",
  defaultColor = "#D1D5DB",
  hoverColor = "#2563EB",
  activeColor = "#1E3A8A",
  onToothSelect = null,
  resetSelection = false, // 🔥 Yeni: Seçimi təmizləmək üçün
  patientPlansData = [], // 🔥 Gələn patient plans data
  planKey = null, // 🔥 Plan key (Yetkin/Uşaq)
}) => {

  const [hoveredPathId, setHoveredPathId] = useState(null);
  const [selectedToaths, setSelectedToaths] = useState([]);
  const [showUpperJaw, setShowUpperJaw] = useState(true); // Üst çənə göstər/gizlə
  const [showLowerJaw, setShowLowerJaw] = useState(true); // Alt çənə göstər/gizlə

  // Üst çənə toggle - həmişə ən azı biri seçili olmalıdır
  const handleToggleUpperJaw = () => {
    if (!showUpperJaw) {
      // Açırsa, açılsın
      setShowUpperJaw(true);
    } else {
      // Bağlayırsa, amma alt çənə açıq deyilsə, bağlana bilməz
      if (showLowerJaw) {
        setShowUpperJaw(false);
      }
    }
  };

  // Alt çənə toggle - həmişə ən azı biri seçili olmalıdır
  const handleToggleLowerJaw = () => {
    if (!showLowerJaw) {
      // Açırsa, açılsın
      setShowLowerJaw(true);
    } else {
      // Bağlayırsa, amma üst çənə açıq deyilsə, bağlana bilməz
      if (showUpperJaw) {
        setShowLowerJaw(false);
      }
    }
  };

  // Diş seçimini sil
  const handleClearSelection = () => {
    setSelectedToaths([]);
    if (onToothSelect) {
      onToothSelect(null);
    }
  };

  const handlePathClick = (toath, path) => {
    if (!path.isClickable) return;

    // Əgər başqa bir diş seçilibsə, yalnız seçilmiş dişi silə bilərsən
    const hasAnySelection = selectedToaths.length > 0;
    const isCurrentToathSelected = selectedToaths.some(t => t.toathNumber === toath.toathNumber);
    
    if (hasAnySelection && !isCurrentToathSelected) {
      // Başqa bir diş seçilibsə, yeni diş seçilə bilməz
      return;
    }

    setSelectedToaths((prev) => {
      const existing = prev.find((t) => t.toathNumber === toath.toathNumber);

      if (existing) {
        // Eyni toath artıq varsa - seçimi sil və ya əlavə et
        const alreadySelected = existing.pathIds.includes(path.id);
        const updatedPathIds = alreadySelected
          ? existing.pathIds.filter((id) => id !== path.id)
          : [...existing.pathIds, path.id];

        // Əgər toath içindəki pathlər tamamilə boşaldısa, toath-ı siyahıdan çıxar
        if (updatedPathIds.length === 0) {
          const newState = prev.filter((t) => t.toathNumber !== toath.toathNumber);
          // Parent-a null göndər (seçim yoxdur)
          if (onToothSelect) {
            onToothSelect(null);
          }
          return newState;
        }

        const updatedState = prev.map((t) =>
          t.toathNumber === toath.toathNumber
            ? { ...t, pathIds: updatedPathIds }
            : t
        );
        // Parent-a yenilənmiş diş məlumatını göndər
        if (onToothSelect && updatedState.length > 0) {
          onToothSelect(updatedState[0]);
        }
        return updatedState;
      } else {
        // toath ilk dəfə seçilirsə - əvvəlki seçimləri təmizlə və yeni seçimi et
        const newSelection = [{ toathNumber: toath.toathNumber, pathIds: [path.id] }];
        // Parent-a seçilmiş diş məlumatını göndər
        if (onToothSelect) {
          onToothSelect({ toothNumber: toath.toathNumber, pathIds: [path.id] });
        }
        return newSelection;
      }
    });
  };

  // selectedToaths dəyişdikdə parent-a bildir
  useEffect(() => {
    if (selectedToaths.length > 0 && onToothSelect) {
      const selectedTooth = selectedToaths[0];
      onToothSelect(selectedTooth);
    } else if (selectedToaths.length === 0 && onToothSelect) {
      onToothSelect(null);
    }
  }, [selectedToaths, onToothSelect]);

  // resetSelection true olduqda seçimi təmizlə
  useEffect(() => {
    if (resetSelection) {
      setSelectedToaths([]);
      if (onToothSelect) {
        onToothSelect(null);
      }
    }
  }, [resetSelection, onToothSelect]);

  const sortToaths = (toaths = []) =>
    [...toaths].sort((a, b) => a.priority - b.priority);

  // categoryCode null-dursa heç bir diş göstərilməsin
  if (categoryCode === null || categoryCode === undefined) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] text-gray-400">
        <p>Əməliyyat seçin</p>
      </div>
    );
  }

  // categoryCode-a görə dişləri filtrlə
  const filteredCategories = data.flatMap((section) =>
    section.categorys?.filter((cat) => cat.categoryCode === categoryCode) || []
  );

  // Əgər categoryCode var amma o koda aid diş yoxdursa
  if (filteredCategories.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] text-gray-400">
        <p>Bu əməliyyata uyğun diş tapılmadı</p>
      </div>
    );
  }

  // Dişlərin ümumi sayını yoxla
  const totalToaths = filteredCategories.reduce(
    (sum, cat) => sum + (cat.toaths?.length || 0),
    0
  );

  if (totalToaths === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] text-gray-400">
        <p>Bu əməliyyata uyğun diş tapılmadı</p>
      </div>
    );
  }

  // Uşaq planında görünməməli dişlər (istifadəçi tərəfindən əlavə ediləcək)
  const hiddenToothNumbersForChild = [18, 17,16,48,47,46,36,37,38,26,27,28];
  
  // Dişin görünməli olub olmadığını yoxla
  const shouldShowTooth = (toathNumber) => {
    // Əgər planKey "Uşaq" deyilsə, bütün dişləri göstər
    if (planKey !== 'Uşaq') {
      return true;
    }
    
    // planKey "Uşaq" olarsa, yalnız müəyyən dişləri gizlə
    const toothNum = Number(toathNumber);
    const shouldHide = hiddenToothNumbersForChild.includes(toothNum);
    
    // Gizlənməli dişlər görünməsin
    return !shouldHide;
  };

  // Bölgələrə görə dişləri qrupla
  const groupedByRegion = data.reduce((acc, section) => {
    const regionCode = section.code; // LEFT_TOP, RIGHT_TOP, LEFT_BOTTOM, RIGHT_BOTTOM
    if (!regionCode) return acc;

    const filteredCategories = section.categorys?.filter(
      (cat) => cat.categoryCode === categoryCode
    ) || [];

    if (filteredCategories.length === 0) return acc;

    if (!acc[regionCode]) {
      acc[regionCode] = [];
    }

    filteredCategories.forEach((cat) => {
      if (cat.toaths && cat.toaths.length > 0) {
        // Dişləri filtrlə - yalnız görünməli olanları əlavə et
        const filteredToaths = cat.toaths.filter(toath => 
          shouldShowTooth(toath.toathNumber)
        );
        acc[regionCode].push(...filteredToaths);
      }
    });

    return acc;
  }, {});

  // Bölgə adlarını göstər
  const getRegionLabel = (code) => {
    return code; // LEFT_TOP, RIGHT_TOP, LEFT_BOTTOM, RIGHT_BOTTOM
  };

  // Üst və alt bölgələri ayır
  const topRegions = ['LEFT_TOP', 'RIGHT_TOP'];
  const bottomRegions = ['LEFT_BOTTOM', 'RIGHT_BOTTOM'];

  // Gələn datadan diş parçalarını çıxar (partOfToothId-yə görə)
  const getPlannedToothParts = () => {
    const plannedParts = new Set(); // Bütün planlaşdırılmış partOfToothId-lər
    
    patientPlansData.forEach((item) => {
      const { patientPlansDto } = item;
      if (!patientPlansDto) return;
      
      const partOfTeethIds = patientPlansDto.partOfTeethIds || [];
      partOfTeethIds.forEach(part => {
        if (part.partOfToothId) {
          plannedParts.add(part.partOfToothId);
        }
      });
    });
    
    return plannedParts;
  };

  const plannedToothParts = getPlannedToothParts();
  
  // Bir diş parçası planlaşdırılmışmı yoxla (partOfToothId-yə görə)
  const isToothPartPlanned = (pathId) => {
    return plannedToothParts.has(pathId);
  };
  
  // Bir diş planlaşdırılmışmı yoxla (dişdəki hər hansı bir parça planlaşdırılmışsa)
  const isToothPlanned = (toath) => {
    if (!toath.paths) return false;
    return toath.paths.some(path => isToothPartPlanned(path.id));
  };

  const renderRegion = (regionCode, isBottom = false) => {
    const toaths = groupedByRegion[regionCode] || [];
    if (toaths.length === 0) return null;

    const sortedToaths = sortToaths(toaths);

    return (
      <div key={regionCode} className="flex flex-col gap-2 flex-1">
        {/* Dişlər */}
        <div className="flex flex-wrap gap-1">
          {sortedToaths.map((toath) => {
            // o toath üçün seçilmiş path id-lərini tapır
            const selectedPathIds =
              selectedToaths.find((t) => t.toathNumber === toath.toathNumber)
                ?.pathIds || [];

            // Bu diş seçilimidir?
            const isToathSelected = selectedToaths.some(t => t.toathNumber === toath.toathNumber);
            
            // Başqa bir diş seçilimidir?
            const hasOtherSelection = selectedToaths.length > 0 && !isToathSelected;

            const isPlanned = isToothPlanned(toath);

            return (
              <div 
                key={toath.id} 
                className="text-center"
                style={{
                  opacity: hasOtherSelection ? 0.3 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {/* Alt bölgələrdə diş nömrəsi yuxarıda */}
                {isBottom && (
                  <h2 className={`mb-2 text-sm font-semibold ${hasOtherSelection ? 'text-gray-400' : isPlanned ? 'text-black' : 'text-gray-700'}`}>
                    {toath.toathNumber ? (Number(toath.toathNumber) % 10) : ""}
                  </h2>
                )}

                {/* SVG */}
                <div className="relative inline-block">
                  <svg
                    width={width}
                    height={height}
                    viewBox={viewBox}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {toath.paths?.map((path) => {
                      const isSelected = selectedPathIds.includes(path.id);
                      const isHovered = hoveredPathId === path.id;
                      const isPathPlanned = isToothPartPlanned(path.id);
                      
                      // Planlaşdırılmış diş parçaları seçilə bilməz
                      const isClickable = path.isClickable && !isPathPlanned && (!hasOtherSelection || isToathSelected);

                      // Planlaşdırılmış diş parçaları qara rənglə göstər
                      const fillColor = isPathPlanned
                        ? "#000000" // Qara rəng
                        : isSelected
                          ? activeColor
                          : isHovered && isClickable
                            ? hoverColor
                            : path.fill || defaultColor;

                      return (
                        <path
                          key={path.id}
                          d={path.path}
                          fill={fillColor}
                          stroke={path.stroke}
                          strokeWidth={path.stroke-width || 1}
                          style={{
                            cursor: isClickable ? "pointer" : "not-allowed",
                            transition: "fill 0.25s ease, opacity 0.3s ease",
                          }}
                          onClick={() => handlePathClick(toath, path)}
                          onMouseEnter={() =>
                            isClickable && setHoveredPathId(path.id)
                          }
                          onMouseLeave={() => setHoveredPathId(null)}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Üst bölgələrdə diş nömrəsi aşağıda */}
                {!isBottom && (
                  <h2 className={`mt-2 text-sm font-semibold ${hasOtherSelection ? 'text-gray-400' : isPlanned ? 'text-black' : 'text-gray-700'}`}>
                    {toath.toathNumber ? (Number(toath.toathNumber) % 10) : ""}
                  </h2>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Filtre butonları - Toggle button, amma həmişə ən azı biri seçili olmalıdır */}
      <div className="flex gap-2 mb-4">
        <Button
          type={showUpperJaw ? "primary" : "default"}
          icon={<ArrowUpOutlined />}
          onClick={handleToggleUpperJaw}
          disabled={!showUpperJaw && !showLowerJaw}
        >
          Üst Çənə
        </Button>
        <Button
          type={showLowerJaw ? "primary" : "default"}
          icon={<ArrowDownOutlined />}
          onClick={handleToggleLowerJaw}
          disabled={!showUpperJaw && !showLowerJaw}
        >
          Alt Çənə
        </Button>
        
        {/* Diş seçimini sil buttonu - yalnız diş seçildikdə görünsün */}
        {selectedToaths.length > 0 && (
          <Button
            type="default"
            danger
            icon={<CloseOutlined />}
            onClick={handleClearSelection}
          >
            Diş Seçimini Sil
          </Button>
        )}
      </div>

      {/* Üst bölgeler - yan yana */}
      {showUpperJaw && (
        <div className="flex">
          {topRegions.map((regionCode) => renderRegion(regionCode, false))}
        </div>
      )}

      {/* Alt bölgeler - yan yana */}
      {showLowerJaw && (
        <div className="flex">
          {bottomRegions.map((regionCode) => renderRegion(regionCode, true))}
        </div>
      )}

   
    </div>
  );
};

export default InteractiveSVG;
