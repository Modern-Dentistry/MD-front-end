import React, { useState, useEffect, useRef } from "react";
import { Button, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, CloseOutlined } from "@ant-design/icons";

const InteractiveSVG = ({
  data = [],
  categoryCode = null,   // 🔥 Yeni
  width = 110,
  height = 110,
  viewBox = "0 0 150 150",
  defaultColor = "#22C55E", // Yaşıl rəng
  hoverColor = "#2563EB",
  activeColor = "#1E3A8A",
  onToothSelect = null,
  resetSelection = false, // 🔥 Yeni: Seçimi təmizləmək üçün
  patientPlansData = [], // 🔥 Gələn patient plans data
  planKey = null, // 🔥 Plan key (Yetkin/Uşaq)
  externalSelection = null, // 🔥 Table-dan gələn seçim: { toothNumbers: [], partOfToothIds: [] }
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

  // Gələn datadan diş parçalarını çıxar (partOfToothId-yə görə) - handlePathClick-dən əvvəl olmalıdır
  // Yeni format: { key, patientPlanId, categoryId, categoryName, categoryCode, toothNo, details: [{ id, partOfToothId, operationName, price }] }
  const getPlannedToothParts = () => {
    const plannedParts = new Set(); // Bütün planlaşdırılmış partOfToothId-lər
    
    patientPlansData.forEach((item) => {
      const details = item.details || [];
      details.forEach(detail => {
        if (detail.partOfToothId) {
          plannedParts.add(detail.partOfToothId);
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

  const handlePathClick = (toath, path) => {
    // Yalnız clickable və planlaşdırılmış diş parçaları seçilə bilər
    if (!path.isClickable) return;
    
    // Planlaşdırılmış diş parçası yoxdursa, seçim etmə
    if (!isToothPartPlanned(path.id)) return;

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
          return newState;
        }

        const updatedState = prev.map((t) =>
          t.toathNumber === toath.toathNumber
            ? { ...t, pathIds: updatedPathIds }
            : t
        );
        return updatedState;
      } else {
        // toath ilk dəfə seçilirsə - əvvəlki seçimləri saxla və yeni seçimi əlavə et
        return [...prev, { toathNumber: toath.toathNumber, pathIds: [path.id] }];
      }
    });
  };

  // selectedToaths dəyişdikdə parent-a bildir (yalnız user click-ləri üçün)
  const isExternalSelectionRef = useRef(false);
  
  useEffect(() => {
    // External selection-dan gələn dəyişiklikləri ignore et
    if (isExternalSelectionRef.current) {
      isExternalSelectionRef.current = false;
      return; 
    }
    
    if (selectedToaths.length > 0 && onToothSelect) {
      // Bütün seçilmiş dişləri göndər
      onToothSelect(selectedToaths);
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

  // External selection (table-dan gələn seçim) dəyişdikdə seçimi yenilə
  useEffect(() => {
    isExternalSelectionRef.current = true; // Flag set et ki, onToothSelect çağırılmasın
    
    if (externalSelection && externalSelection.toothNumbers && externalSelection.toothNumbers.length > 0) {
      // External selection-dan selectedToaths yarat
      const newSelection = [];
      
      // Data-dan bütün dişləri tap
      data.forEach(section => {
        section.categorys?.forEach(cat => {
          if (cat.toaths) {
            cat.toaths.forEach(toath => {
              if (externalSelection.toothNumbers.includes(toath.toathNumber)) {
                if (toath.paths) {
                  // Əgər partOfToothIds varsa, yalnız onları seç, yoxsa bütün path-ləri seç
                  const pathIds = externalSelection.partOfToothIds && externalSelection.partOfToothIds.length > 0
                    ? toath.paths
                        .filter(path => externalSelection.partOfToothIds.includes(path.id))
                        .map(path => path.id)
                    : toath.paths.map(path => path.id);
                  
                  // Yalnız pathIds boş deyilsə, dişi seçimə əlavə et
                  if (pathIds.length > 0) {
                    // Eyni diş artıq əlavə edilməyibsə, əlavə et
                    if (!newSelection.find(s => s.toathNumber === toath.toathNumber)) {
                      newSelection.push({
                        toathNumber: toath.toathNumber,
                        pathIds: pathIds
                      });
                    }
                  }
                }
              }
            });
          }
        });
      });
      
      setSelectedToaths(newSelection);
    } else if (externalSelection === null || (externalSelection && (!externalSelection.toothNumbers || externalSelection.toothNumbers.length === 0))) {
      // External selection null və ya boşdursa, seçimi təmizlə
      setSelectedToaths([]);
    }
  }, [externalSelection, data]);

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

            const isPlanned = isToothPlanned(toath);

            return (
              <div 
                key={toath.id} 
                className="text-center"
                style={{
                  opacity: isPlanned ? 1 : 0.4,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {/* Alt bölgələrdə diş nömrəsi yuxarıda */}
                {isBottom && (
                  <h2 className={`mb-2 text-sm font-semibold ${isPlanned ? 'text-gray-700' : 'text-gray-400'}`} style={{ opacity: isPlanned ? 1 : 0.4 }}>
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
                      
                      // Yalnız planlaşdırılmış diş parçaları seçilə bilər
                      const isClickable = path.isClickable && isPathPlanned;

                      // Planlaşdırılmış diş parçaları yaşıl rəngdə, digərləri disabled görünüşdə
                      const fillColor = isPathPlanned
                        ? isSelected
                          ? activeColor
                          : isHovered && isClickable
                            ? hoverColor
                            : defaultColor // Planlaşdırılmış diş parçaları yaşıl rəngdə
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
                            opacity: isPathPlanned ? 1 : 0.4, // Planlaşdırılmamış diş parçaları disabled görünüşdə
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
                  <h2 className={`mt-2 text-sm font-semibold ${isPlanned ? 'text-gray-700' : 'text-gray-400'}`} style={{ opacity: isPlanned ? 1 : 0.4 }}>
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
