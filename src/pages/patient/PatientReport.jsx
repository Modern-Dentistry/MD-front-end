import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Style
import "../../assets/style/PatientPage/patientreport.css";

// Components
import CustomDropdown from "../../components/CustomDropdown";

// Icons
import { FiDownload } from "react-icons/fi";

// Mock Data
let operations = [
  { label: "Dolğu", value: "dolgu" },
  { label: "Çəkim", value: "cekim" },
  { label: "İmplanta", value: "implanta" },
  { label: "Kanal müalicəsi", value: "kanal" },
];

let teethNumbers = Array.from({ length: 32 }, (_, i) => ({
  label: `Diş ${i + 1}`,
  value: (i + 1).toString(),
}));

 const reportData = [
    {
      planDate: "01.05.2024",
      patient: "Elnur Quliyev",
      toothNo: "12",
      operation: "Implant",
      plannerDoctor: "Dr. Murad",
      price: "300 AZN",
      discount: "50 AZN",
      total: "250 AZN",
      executionDate: "05.05.2024",
      executorDoctor: "Dr. Aysel"
    },
    {
      planDate: "02.05.2024",
      patient: "Aysel Məmmədova",
      toothNo: "24",
      operation: "Diş Çəkimi",
      plannerDoctor: "Dr. Cavid",
      price: "80 AZN",
      discount: "0 AZN",
      total: "80 AZN",
      executionDate: "04.05.2024",
      executorDoctor: "Dr. Murad"
    },
    {
      planDate: "02.05.2024",
      patient: "Aysel Məmmədova",
      toothNo: "24",
      operation: "Diş Çəkimi",
      plannerDoctor: "Dr. Cavid",
      price: "80 AZN",
      discount: "0 AZN",
      total: "80 AZN",
      executionDate: "04.05.2024",
      executorDoctor: "Dr. Murad"
    },
    {
      planDate: "02.05.2024",
      patient: "Aysel Məmmədova",
      toothNo: "24",
      operation: "Diş Çəkimi",
      plannerDoctor: "Dr. Cavid",
      price: "80 AZN",
      discount: "0 AZN",
      total: "80 AZN",
      executionDate: "04.05.2024",
      executorDoctor: "Dr. Murad"
    },
    {
      planDate: "02.05.2024",
      patient: "Aysel Məmmədova",
      toothNo: "24",
      operation: "Diş Çəkimi",
      plannerDoctor: "Dr. Cavid",
      price: "80 AZN",
      discount: "0 AZN",
      total: "80 AZN",
      executionDate: "04.05.2024",
      executorDoctor: "Dr. Murad"
    },
    {
      planDate: "02.05.2024",
      patient: "Aysel Məmmədova",
      toothNo: "24",
      operation: "Diş Çəkimi",
      plannerDoctor: "Dr. Cavid",
      price: "80 AZN",
      discount: "0 AZN",
      total: "80 AZN",
      executionDate: "04.05.2024",
      executorDoctor: "Dr. Murad"
    },
    // ...istəsən daha çox data əlavə et
  ];

function PatientReport() {
  const operationRef = useRef(null);
  const toothRef = useRef(null);

  const [selectedOperation, setSelectedOperation] = useState(null);
  const [selectedTooth, setSelectedTooth] = useState(null);

  return (
    <>
      <div className="patientReportWrapper">
        <div className="patientReportTopPart">
          <div className="patientReportTopPartLeft">
            <CustomDropdown
              innerRef={operationRef}
              value={selectedOperation}
              onChange={(option) => setSelectedOperation(option.value)}
              placeholder="Əməliyyat"
              options={operations}
            />
            <input
              type="text"
              placeholder="Başlama tarixi"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
            />
            <input
              type="text"
              placeholder="Bitmə tarixi"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
            />
            <CustomDropdown
              innerRef={toothRef}
              value={selectedTooth}
              onChange={(option) => setSelectedTooth(option.value)}
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
        <div className="patientReportTableWrapper">
            <div className="patientReportTableScrollContainer">
                <table className="patientReportTable">
                <thead>
                    <tr>
                    <th>1-{reportData.length}</th>
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
                    {reportData.map((item, index) => (
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
                </tbody>
                </table>
            </div>
        </div>

      </div>
    </>
  );
}

export default PatientReport;
