import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "./CustomDropdown";
import ToothSelector from "./ToothSelector";
import MultiFileForm from "./MultiFileForm";
import useDentalOrderStore from "../../stores/dentalOrderStore";
import { readAllTeeth, createTooth } from "../api/teeth";

import useGarnitureStore from "../../stores/garnitureStore";
import useColorStore from "../../stores/colorStore";
import useTechnicianStore from "../../stores/technicianStore";
import usePatientStore from "../../stores/patiendStore";
import useCalendarStore from "../../stores/calendarStore";
import useCeramicsStore from "../../stores/ceramicStore";
import useMetalStore from "../../stores/metalsStore";
import "../assets/style/form.css";

// Fallback data
const fallbackColors = [
  { value: 1, label: "A1" },
  { value: 2, label: "A2" },
  { value: 3, label: "A3" },
  { value: 4, label: "A3.5" },
  { value: 5, label: "A4" },
];
const fallbackMetals = [
  { value: 1, label: "Nikel-Krom" },
  { value: 2, label: "Kobalt-Krom" },
  { value: 3, label: "Titanyum" },
  { value: 4, label: "Altın Alaşım" },
];
const fallbackGarnitures = [
  { value: 1, label: "Standard" },
  { value: 2, label: "Premium" },
  { value: 3, label: "Lüks" },
];

// Helper function to format date strings to YYYY-MM-DD
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString().split("T")[0];
  } catch (e) {
    console.error("Invalid date string:", dateString);
    return "";
  }
};

const OrderForm = ({ initialData, mode = "create", onSubmit, onCancel }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: initialData || {},
  });

  // State for dropdown options
  const [garnitures, setGarnitures] = useState([]);
  const [colors, setColors] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [ceramics, setCeramics] = useState([]);
  const [metals, setMetals] = useState([]);

  // Other component states
  const [selectedTeeth, setSelectedTeeth] = useState(
    initialData?.teethList || []
  );
  const [isChild, setIsChild] = useState(
    initialData?.isChild !== undefined ? initialData.isChild : false
  );
  const [toothDetails, setToothDetails] = useState(
    initialData?.toothDetailIds || []
  );
  const [files, setFiles] = useState([]);

  // Initialize stores
  const dentalOrderStore = useDentalOrderStore();

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        orderDate: formatDate(initialData.orderDate),
        inspectionDate: formatDate(
          initialData.inspectionDate || initialData.checkDate
        ),
        deliveryDate: formatDate(initialData.deliveryDate),
        doctor: initialData.doctorId || initialData.doctor,
        technician: initialData.technicianId || initialData.technician,
        patient: initialData.patientId || initialData.patient,
        workType: initialData.dentalWorkType,
        notes: initialData.description || initialData.notes,
        color: initialData.orderDentureInfo?.color ? Number(initialData.orderDentureInfo?.color) : null,
        garniture: initialData.orderDentureInfo?.garniture ? Number(initialData.orderDentureInfo?.garniture) : null,
      };
      reset(formattedData);

      const teethList = initialData.teethList || [];
      const detailsList = initialData.toothDetails || initialData.toothDetailIds || [];

      const localSelectedTeeth = teethList.map(t => (typeof t === 'object' ? t.toothNo : t));
      const localToothDetails = teethList.map((t, idx) => {
        const toothNumber = typeof t === 'object' ? t.toothNo : t;
        const details = detailsList[idx] || {};
        return {
          toothNumber,
          colorId: details.colorId || null,
          metalId: details.metalId || null,
          ceramicId: details.ceramicId || null,
        };
      });

      setToothDetails(localToothDetails);
      setSelectedTeeth(localSelectedTeeth);
      setIsChild(
        initialData.isChild !== undefined ? initialData.isChild : false
      );
    }
  }, [initialData, reset]);

  // Fetch data only once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.allSettled([
          useGarnitureStore.getState().fetchGarnitureList(),
          useColorStore.getState().fetchColorList(),
          useTechnicianStore.getState().fetchTechnicians(),
          usePatientStore.getState().fetchPatients(),
          useCalendarStore.getState().fetchDoctors(),
          useCeramicsStore.getState().fetchCeramicsList(),
          useMetalStore.getState().fetchMetals(),
        ]);

        setGarnitures(
          useGarnitureStore.getState().garnitures?.map((item) => ({
            value: item.id,
            label: item.name || "N/A",
          })) || fallbackGarnitures
        );
        setColors(
          useColorStore.getState().colors?.map((item) => ({
            value: item.id,
            label: item.name || "N/A",
          })) || fallbackColors
        );
        setTechnicians(
          useTechnicianStore.getState().technicians?.map((item) => ({
            value: item.id,
            label: `${item.name} ${item.surname}`,
          })) || []
        );
        setPatients(
          usePatientStore.getState().patients?.map((item) => ({
            value: item.id,
            label: `${item.name} ${item.surname}`,
          })) || []
        );
        setDoctors(
          useCalendarStore.getState().doctors?.map((item) => ({
            value: item.doctorId || item.id,
            label: `${item.name} ${item.surname}`,
          })) || []
        );
        setCeramics(
          useCeramicsStore
            .getState()
            .ceramics?.map((item) => ({ value: item.id, label: item.name })) ||
            []
        );
        setMetals(
          useMetalStore
            .getState()
            .metals?.map((item) => ({ value: item.id, label: item.name })) ||
            fallbackMetals
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleToothSelect = (tooth) => {
    const newSelectedTeeth = selectedTeeth.includes(tooth)
      ? selectedTeeth.filter((t) => t !== tooth)
      : [...selectedTeeth, tooth];
    setSelectedTeeth(newSelectedTeeth);

    const newToothDetails = [...toothDetails];
    newSelectedTeeth.forEach((toothNumber) => {
      if (
        !newToothDetails.find((detail) => detail.toothNumber === toothNumber)
      ) {
        newToothDetails.push({
          toothNumber,
          colorId: null,
          metalId: null,
          ceramicId: null,
        });
      }
    });

    const filteredDetails = newToothDetails.filter((detail) =>
      newSelectedTeeth.includes(detail.toothNumber)
    );
    setToothDetails(filteredDetails);
  };

  const handleToothDetailChange = (toothNumber, field, value) => {
    const updatedDetails = toothDetails.map((detail) =>
      detail.toothNumber === toothNumber
        ? { ...detail, [field]: value }
        : detail
    );
    setToothDetails(updatedDetails);
  };

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
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

  const handleFormSubmit = async (data) => {
    try {
      // 1. Fetch current registered teeth from DB to check/create
      const currentDbTeeth = await readAllTeeth();
      const resolvedTeethIds = [];

      if (data.workType === "QAPAQ") {
        for (const toothNo of selectedTeeth) {
          let dbTooth = currentDbTeeth.find((t) => Number(t.toothNo) === Number(toothNo));
          if (!dbTooth) {
            const parsed = parseFDINumber(toothNo);
            if (parsed) {
              dbTooth = await createTooth({
                toothNo: Number(toothNo),
                toothType: parsed.type,
                toothLocation: parsed.location
              });
              currentDbTeeth.push(dbTooth);
            }
          }
          if (dbTooth) {
            resolvedTeethIds.push(Number(dbTooth.id));
          }
        }
      }

      // 2. Prepare toothDetailIds matching the indices of resolvedTeethIds
      const toothDetailIds = resolvedTeethIds.map((teethId) => {
        const dbTooth = currentDbTeeth.find((t) => Number(t.id) === Number(teethId));
        const toothNo = dbTooth ? dbTooth.toothNo : null;
        const localDetail = toothDetails.find((d) => Number(d.toothNumber) === Number(toothNo)) || {};

        return {
          colorId: localDetail.colorId ? Number(localDetail.colorId) : null,
          metalId: localDetail.metalId ? Number(localDetail.metalId) : null,
          ceramicId: localDetail.ceramicId ? Number(localDetail.ceramicId) : null,
        };
      });

      // 3. Construct the payload matching the Swagger spec
      const submitData = {
        checkDate: data.inspectionDate,
        orderDate: data.orderDate,
        deliveryDate: data.deliveryDate,
        description: data.notes || "",
        dentalWorkType: data.workType,
        toothDetailIds: toothDetailIds,
        teethList: resolvedTeethIds,
        doctorId: data.doctor,
        technicianId: data.technician,
        patientId: parseInt(data.patient),
      };

      if (data.workType === "PROTEZ") {
        submitData.orderDentureInfo = {
          color: data.color ? String(data.color) : null,
          garniture: data.garniture ? String(data.garniture) : null,
        };
      }

      if (files.length > 0) {
        submitData.files = files.map((file) => file.base64 || file);
      }

      if (mode === "create") {
        await dentalOrderStore.addOrder(submitData);
      } else if (mode === "edit") {
        await dentalOrderStore.editOrder({ ...submitData, id: initialData.id });
      }
      if (onSubmit) {
        onSubmit(submitData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const workTypes = [
    { value: "PROTEZ", label: "Protez" },
    { value: "QAPAQ", label: "Qapaq" },
  ];
  const formValues = watch();

  const selectedDoctor = useMemo(() => {
    const found = doctors.find((d) => d.value === formValues.doctor);
    if (!found && formValues.doctor && typeof formValues.doctor === "string") {
      return { value: formValues.doctor, label: formValues.doctor };
    }
    return found || null;
  }, [doctors, formValues.doctor]);

  const selectedTechnician = useMemo(() => {
    const found = technicians.find((t) => t.value === formValues.technician);
    if (!found && formValues.technician && typeof formValues.technician === "string") {
      return { value: formValues.technician, label: formValues.technician };
    }
    return found || null;
  }, [technicians, formValues.technician]);

  const selectedPatient = useMemo(() => {
    const found = patients.find((p) => p.value === formValues.patient);
    if (!found && formValues.patient && typeof formValues.patient === "string") {
      return { value: formValues.patient, label: formValues.patient };
    }
    return found || null;
  }, [patients, formValues.patient]);
  const selectedWorkType = useMemo(
    () => workTypes.find((w) => w.value === formValues.workType) || null,
    [workTypes, formValues.workType]
  );
  const selectedColor = useMemo(
    () => colors.find((c) => c.value === formValues.color) || null,
    [colors, formValues.color]
  );
  const selectedGarniture = useMemo(
    () => garnitures.find((g) => g.value === formValues.garniture) || null,
    [garnitures, formValues.garniture]
  );
  
  // DÜZƏLİŞ: PROTEZ iş növü üçün qarnitur və rəng sahələrini göstər
  const renderDentureFields = formValues.workType === "PROTEZ";
  // DÜZƏLİŞ: QAPAQ iş növü üçün diş seçim sahələrini göstər
  const renderToothFields = formValues.workType === "QAPAQ";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 border border-[#E5E7EB] rounded-lg p-6 bg-white">
        {/* Doctor Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="doctor">
            {" "}
            Həkim <span className="text-red-500">*</span>{" "}
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={doctors}
              value={selectedDoctor}
              onChange={(option) =>
                setValue("doctor", option ? option.value : null)
              }
              placeholder="Həkim seçin"
              name="doctor"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Technician Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="technician">
            {" "}
            Texnik <span className="text-red-500">*</span>{" "}
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={technicians}
              value={selectedTechnician}
              onChange={(option) =>
                setValue("technician", option ? option.value : null)
              }
              placeholder="Texnik seçin"
              name="technician"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Patient Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="patient">
            {" "}
            Pasiyent <span className="text-red-500">*</span>{" "}
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={patients}
              value={selectedPatient}
              onChange={(option) =>
                setValue("patient", option ? option.value : null)
              }
              placeholder="Pasiyent seçin"
              name="patient"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Date Inputs */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="orderDate">
            {" "}
            Sifariş tarixi <span className="text-red-500">*</span>{" "}
          </label>
          <div className="w-[950px]">
            <input
              id="orderDate"
              type="date"
              {...register("orderDate", { required: true })}
              readOnly={mode === "view"}
              className={`w-full h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
                mode === "view" ? "bg-gray-200" : ""
              }`}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="inspectionDate">
            {" "}
            Yoxlanılma tarixi <span className="text-red-500">*</span>{" "}
          </label>
          <div className="w-[950px]">
            <input
              id="inspectionDate"
              type="date"
              {...register("inspectionDate", { required: true })}
              readOnly={mode === "view"}
              className={`w-full h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
                mode === "view" ? "bg-gray-200" : ""
              }`}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="deliveryDate">
            {" "}
            Təhvil tarixi <span className="text-red-500">*</span>{" "}
          </label>
          <div className="w-[950px]">
            <input
              id="deliveryDate"
              type="date"
              {...register("deliveryDate", { required: true })}
              readOnly={mode === "view"}
              className={`w-full h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
                mode === "view" ? "bg-gray-200" : ""
              }`}
            />
          </div>
        </div>

        {/* Work Type Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="workType">
            {" "}
            İşin növü <span className="text-red-500">*</span>{" "}
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={workTypes}
              value={selectedWorkType}
              onChange={(option) => {
                setValue("workType", option ? option.value : null);
                setSelectedTeeth([]);
                setToothDetails([]);
              }}
              placeholder="İşin növünü seçin"
              name="workType"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Conditional Denture Fields - PROTEZ üçün */}
        {renderDentureFields && (
          <>
            <div className="flex justify-between items-center gap-2">
              <label>
                {" "}
                Rəng <span className="text-red-500">*</span>{" "}
              </label>
              <div className="w-[950px]">
                <CustomDropdown
                  options={colors}
                  value={selectedColor}
                  onChange={(option) =>
                    setValue("color", option ? option.value : null)
                  }
                  placeholder="Rəng seçin"
                  disabled={mode === "view"}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="garniture">
                {" "}
                Qarnitur <span className="text-red-500">*</span>{" "}
              </label>
              <div className="w-[950px]">
                <CustomDropdown
                  options={garnitures}
                  value={selectedGarniture}
                  onChange={(option) =>
                    setValue("garniture", option ? option.value : null)
                  }
                  placeholder="Qarnitur seçin"
                  name="garniture"
                  disabled={mode === "view"}
                />
              </div>
            </div>
          </>
        )}

        {/* Notes */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="notes">Qeyd</label>
          <div className="w-[950px]">
            <textarea
              id="notes"
              {...register("notes")}
              readOnly={mode === "view"}
              className={`w-full h-32 border border-[#D4DCE8] rounded-lg px-4 py-2 resize-none ${
                mode === "view" ? "bg-gray-200" : ""
              }`}
              placeholder="Qeydlər..."
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="files">Fayllar</label>
          <div className="w-[950px]">
            <MultiFileForm
              onFilesChange={handleFilesChange}
              disabled={mode === "view"}
              initialFiles={initialData?.files || []}
            />
          </div>
        </div>
      </div>

      {/* Conditional Tooth Selection - QAPAQ üçün */}
      {renderToothFields && (
        <div className="flex flex-col border border-[#E5E7EB] bg-white rounded-lg w-full p-4 gap-2">
          <h1 className="text-lg font-bold">Diş qrafiki</h1>
          <h2>Təsirə məruz qalan dişlər və müalicə sahələri</h2>
          <div className="flex items-center justify-around border border-[#E5E7EB] rounded-lg w-[198px] h-[40px]">
            <button
              type="button"
              className={`w-[90px] h-[32px] rounded-lg ${
                !isChild ? "bg-[#155EEF] text-white" : ""
              }`}
              onClick={() => {
                setIsChild(false);
                setSelectedTeeth([]);
                setToothDetails([]);
              }}>
              {" "}
              Yetkin{" "}
            </button>
            <button
              type="button"
              className={`w-[90px] h-[32px] rounded-lg ${
                isChild ? "bg-[#155EEF] text-white" : ""
              }`}
              onClick={() => {
                setIsChild(true);
                setSelectedTeeth([]);
                setToothDetails([]);
              }}>
              {" "}
              Uşaq{" "}
            </button>
          </div>
          <div>
            <ToothSelector
              showImage={true}
              selectedTeeth={selectedTeeth}
              onSelect={handleToothSelect}
              isChild={isChild}
              disabled={mode === "view"}
            />
          </div>
          {selectedTeeth.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Diş detalları:</h3>
              {selectedTeeth.map((toothNumber) => {
                const toothDetail =
                  toothDetails.find((d) => d.toothNumber === toothNumber) || {};
                return (
                  <div key={toothNumber} className="mb-4 p-2 border rounded">
                    <h4 className="font-semibold">Diş #{toothNumber}</h4>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <label>Rəng:</label>
                        <CustomDropdown
                          options={colors}
                          value={
                            colors.find(
                              (c) => c.value === toothDetail.colorId
                            ) || null
                          }
                          onChange={(option) =>
                            handleToothDetailChange(
                              toothNumber,
                              "colorId",
                              option ? option.value : null
                            )
                          }
                          placeholder="Rəng seçin"
                          disabled={mode === "view"}
                        />
                      </div>
                      <div>
                        <label>Keramika:</label>
                        <CustomDropdown
                          options={ceramics}
                          value={
                            ceramics.find(
                              (c) => c.value === toothDetail.ceramicId
                            ) || null
                          }
                          onChange={(option) =>
                            handleToothDetailChange(
                              toothNumber,
                              "ceramicId",
                              option ? option.value : null
                            )
                          }
                          placeholder="Keramika seçin"
                          disabled={mode === "view"}
                        />
                      </div>
                      <div>
                        <label>Metal:</label>
                        <CustomDropdown
                          options={metals}
                          value={
                            metals.find(
                              (m) => m.value === toothDetail.metalId
                            ) || null
                          }
                          onChange={(option) =>
                            handleToothDetailChange(
                              toothNumber,
                              "metalId",
                              option ? option.value : null
                            )
                          }
                          placeholder="Metal seçin"
                          disabled={mode === "view"}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Form Actions */}
      <div className="self-end flex gap-4 m-4">
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border text-[#155EEF] border-[#155EEF] rounded-lg hover:bg-gray-100 w-[184px] h-[44px] gap-2"
          onClick={onCancel}>
          <FontAwesomeIcon icon={faXmark} /> Ləğv et
        </button>
        {mode !== "view" && (
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-[#155EEF] text-white rounded-lg hover:bg-[#155EEF] w-[184px] h-[44px] gap-2"
            disabled={dentalOrderStore.loading}>
            <FontAwesomeIcon icon={faCheck} />{" "}
            {dentalOrderStore.loading ? "Yüklənir..." : "Yadda saxla"}
          </button>
        )}
      </div>
    </form>
  );
};

export default OrderForm;