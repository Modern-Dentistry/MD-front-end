import React, { useState } from 'react';

// Style
import "../../assets/style/ReportsPage/reports.css";

// Icons
import { FiDownload } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";

// Libraries
import { Link } from 'react-router-dom';

// Components
import CustomDropdown from '../../components/CustomDropdown';

function ReportsPage() {
  // Mock data
  const doctors = [
    { value: "doctor1", label: "Dr. Murad Əliyev" },
    { value: "doctor2", label: "Dr. Aysel Məmmədova" },
    { value: "doctor3", label: "Dr. Cavid Hüseynov" }
  ];

  const categories = [
    { value: "category1", label: "Ürək Cərrahiyyəsi" },
    { value: "category2", label: "Ortopediya" },
    { value: "category3", label: "Oftalmologiya" }
  ];

  const operations = [
    { value: "operation1", label: "Bypass" },
    { value: "operation2", label: "Menisk əməliyyatı" },
    { value: "operation3", label: "Katarakta əməliyyatı" }
  ];

  const dates = [
    { value: "2024-01-01", label: "01.01.2024" },
    { value: "2024-02-01", label: "01.02.2024" },
    { value: "2024-03-01", label: "01.03.2024" }
  ];

  // States for dropdown selections
  const [plannerDoctor, setPlannerDoctor] = useState(null);
  const [executorDoctor, setExecutorDoctor] = useState(null);
  const [category, setCategory] = useState(null);
  const [operation, setOperation] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSearch = () => {
    console.log("Planlayan:", plannerDoctor);
    console.log("İcraçı:", executorDoctor);
    console.log("Kateqoriya:", category);
    console.log("Əməliyyat:", operation);
    console.log("Tarix Baş:", startDate);
    console.log("Tarix Bit:", endDate);
  };
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

  return (
    <div className="reportsPageWrapper">
      <div className="reportsPageTopPart">
        <p className='reportsPageTitle'>Hesabat</p>
        <Link className='reportsDownload' to={"/"}>
          <FiDownload className='reportsDownloadIcon' />
        </Link>
      </div>
      <div className="reportsPageQuickSearch">
        <div className="quickSearchLeftPart">

        <CustomDropdown
          value={plannerDoctor}
          onChange={(option) => setPlannerDoctor(option.value)}
          options={doctors}
          placeholder="Planlayan həkim"
        />
        <CustomDropdown
          value={executorDoctor}
          onChange={(option) => setExecutorDoctor(option.value)}
          options={doctors}
          placeholder="İcraçı həkim"
        />
        <CustomDropdown
          value={category}
          onChange={(option) => setCategory(option.value)}
          options={categories}
          placeholder="Kateqoriya"
        />
        <CustomDropdown
          value={operation}
          onChange={(option) => setOperation(option.value)}
          options={operations}
          placeholder="Əməliyyat"
        />
        <CustomDropdown
          value={startDate}
          onChange={(option) => setStartDate(option.value)}
          options={dates}
          placeholder="Tarix baş."
        />
        <CustomDropdown
          value={endDate}
          onChange={(option) => setEndDate(option.value)}
          options={dates}
          placeholder="Tarix bit."
        />
        </div>
        <div className="quickSearchRightPart">
          <IoIosSearch
            className='quickSearchReportIcon'
            onClick={handleSearch}
          />
        </div>


      </div>
    <div className="reportsTableWrapper">
        <div className="tableScrollContainer">
          <table className="reportsTable">
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
  );
}

export default ReportsPage;
