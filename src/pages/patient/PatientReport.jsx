import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// Style
import "../../assets/style/PatientPage/patientreport.css";

// Components
import CustomDropdown from "../../components/CustomDropdown";

// Icons
import { FiDownload } from "react-icons/fi";

// Stores
import usePatientStore from "../../../stores/patiendStore";
import usePlansStore from "../../../stores/plans";
import usePatientPlansControllerStore from "../../../stores/patient-plans-controller";

let teethNumbers = Array.from({ length: 32 }, (_, i) => ({
  label: `Diş ${i + 1}`,
  value: (i + 1).toString(),
}));

function PatientReport() {
  const { id: patientId } = useParams();
  const operationRef = useRef(null);
  const toothRef = useRef(null);

  const { fetchPatientById } = usePatientStore();
  const { fetchPlans } = usePlansStore();
  const { readPatientPlans } = usePatientPlansControllerStore();

  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadReportData = async () => {
      if (!patientId) return;
      setLoading(true);
      try {
        // 1. Fetch Patient Info
        const patient = await fetchPatientById(Number(patientId));
        const patientName = patient ? `${patient.name} ${patient.surname}` : "Pasiyent";

        // 2. Fetch all plan mains for patient
        const plansResult = await fetchPlans(Number(patientId));
        if (plansResult.success && Array.isArray(plansResult.data)) {
          const allItems = [];

          // 3. For each plan main, fetch plan items
          for (const planMain of plansResult.data) {
            const planItemsResult = await readPatientPlans(planMain.id);
            if (planItemsResult.success && Array.isArray(planItemsResult.data)) {
              for (const item of planItemsResult.data) {
                const { patientPlansDto } = item;
                if (!patientPlansDto) continue;

                const toothNo = patientPlansDto.toothNo || '-';
                const categoryName = patientPlansDto.operationOfCategoryDto?.categoryName || '-';
                const partOfTeethIds = patientPlansDto.partOfTeethIds || [];

                for (const part of partOfTeethIds) {
                  allItems.push({
                    planDate: planMain.date || new Date().toLocaleDateString("az-AZ"),
                    patient: patientName,
                    toothNo: toothNo ? (Number(toothNo) % 10).toString() : '-',
                    operation: part.operationName || categoryName,
                    plannerDoctor: patient?.workerReadResponse?.fullName || "-",
                    price: part.price ? `${part.price} AZN` : "0 AZN",
                    discount: "0 AZN",
                    total: part.price ? `${part.price} AZN` : "0 AZN",
                    executionDate: planMain.isSave ? "İcra edilib" : "Planlaşdırılıb",
                    executorDoctor: "-"
                  });
                }
              }
            }
          }
          setReportData(allItems);
        }
      } catch (err) {
        console.error("Report loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, [patientId, fetchPatientById, fetchPlans, readPatientPlans]);

  // Extract operations list dynamically from reportData
  const dynamicOperations = Array.from(new Set(reportData.map(item => item.operation)))
    .map(op => ({ label: op, value: op }));

  const filteredReportData = reportData.filter(item => {
    // Operation filter
    if (selectedOperation && item.operation.toLowerCase() !== selectedOperation.toLowerCase()) {
      return false;
    }
    // Tooth filter
    if (selectedTooth && item.toothNo !== selectedTooth) {
      return false;
    }
    // Date filter
    if (startDate || endDate) {
      const parts = item.planDate.split('.');
      const itemDate = new Date(parts[2], parts[1] - 1, parts[0]);
      if (startDate && itemDate < new Date(startDate)) return false;
      if (endDate && itemDate > new Date(endDate)) return false;
    }
    return true;
  });

  return (
    <>
      <div className="patientReportWrapper">
        <div className="patientReportTopPart">
          <div className="patientReportTopPartLeft">
            <CustomDropdown
              innerRef={operationRef}
              value={selectedOperation}
              onChange={(option) => setSelectedOperation(option ? option.value : null)}
              placeholder="Əməliyyat"
              options={dynamicOperations}
            />
            <input
              type="text"
              placeholder="Başlama tarixi"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
            />
            <input
              type="text"
              placeholder="Bitmə tarixi"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
            />
            <CustomDropdown
              innerRef={toothRef}
              value={selectedTooth}
              onChange={(option) => setSelectedTooth(option ? option.value : null)}
              placeholder="Diş No"
              options={teethNumbers}
            />
          </div>
          <div className="patientReportTopPartRight">
            <Link className="reportsPageIncome" to={'./income'}>
              <span className='innerIconForButton'>+</span> Kassa mədaxil
            </Link>
            <Link className="reportsPageOutcome" to={'./outcome'}>
              <span className='innerIconForButton'>+</span>Kassa məxaric
            </Link>
            <Link className="reportsPageExport" target='_blank' to={'/'}>
              <FiDownload className='reportsPageExportIcon' />
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center w-full h-64 text-xl">Məlumatlar yüklənir...</div>
        ) : (
          <div className="patientReportTableWrapper">
              <div className="patientReportTableScrollContainer">
                  <table className="patientReportTable">
                  <thead>
                      <tr>
                      <th>1-{filteredReportData.length}</th>
                      <th>Plan tarixi</th>
                      <th>Pasiyent</th>
                      <th>Diş No</th>
                      <th>Əməliyyat</th>
                      <th>Planlayan həkim</th>
                      <th>Qiyməti</th>
                      <th>Endirim</th>
                      <th>Yekun</th>
                      <th>İcra tarixi</th>
                      <th>İcraçı həkim</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredReportData.map((item, index) => (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.planDate}</td>
                          <td>{item.patient}</td>
                          <td>{item.toothNo}</td>
                          <td>{item.operation}</td>
                          <td>{item.plannerDoctor}</td>
                          <td>{item.price}</td>
                          <td>{item.discount}</td>
                          <td>{item.total}</td>
                          <td>{item.executionDate}</td>
                          <td>{item.executorDoctor}</td>
                      </tr>
                      ))}
                      {filteredReportData.length === 0 && (
                        <tr>
                          <td colSpan="11" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                            Məlumat tapılmadı.
                          </td>
                        </tr>
                      )}
                  </tbody>
                  </table>
              </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PatientReport;
