import React, { useEffect, useState } from "react";

// Components
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";

// Icons
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";

// Style
import "../../assets/style/EmployeesPage/employeespage.css";

// Store
import useEmployeeStore from "../../../stores/workerStore";
const EmployeesList = () => {
  const { workers, fetchWorkers, removeWorker, loading } = useEmployeeStore();

  const [searchUsername, setSearchUsername] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchSurname, setSearchSurname] = useState("");
  const [searchPatronymic, setSearchPatronymic] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const getStatus = (emp) => (emp.enabled ? "Aktiv" : "Passiv");

  const filteredEmployees = workers.filter((e) => {
    const status = getStatus(e).toLowerCase();
    return (
      (e.username?.toLowerCase().includes(searchUsername.toLowerCase()) ||
        !searchUsername) &&
      (e.name?.toLowerCase().includes(searchName.toLowerCase()) ||
        !searchName) &&
      (e.surname?.toLowerCase().includes(searchSurname.toLowerCase()) ||
        !searchSurname) &&
      (e.patronymic?.toLowerCase().includes(searchPatronymic.toLowerCase()) ||
        !searchPatronymic) &&
      (e.phone?.includes(searchPhone) || !searchPhone) &&
      (status.includes(searchStatus.toLowerCase()) || !searchStatus)
    );
  });

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => alert(`Məlumat: ${row.username}`),
      className: "info",
    },
    {
      icon: FiEdit3,
      action: (row) => alert(`Redaktə: ${row.username}`),
      className: "edit",
    },
    {
      icon: GoTrash,
      action: async (row) => {
        const confirmDelete = window.confirm(
          `İşçini silmək istədiyinizə əminsiniz? (${row.username})`
        );
        if (confirmDelete) {
          try {
            await removeWorker(row.id);
            alert("İşçi uğurla silindi!");
          } catch (err) {
            alert("Silinmə zamanı xəta baş verdi.");
          }
        }
      },
      className: "delete",
    },
  ];

  return (
    <div className="employeesListWrapper">
      <OrdinaryListHeader
        title="İşçilər siyahısı"
        addText="Yeni işçi əlavə et"
        addLink="/employee-add"
        exportLink="/employees/export"
      />

      <div className="workersSearchInputs">
        <div className="leftPart">
          <input
            placeholder="İstifadəçi adı"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <input
            placeholder="Ad"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            placeholder="Soyad"
            value={searchSurname}
            onChange={(e) => setSearchSurname(e.target.value)}
          />
          <input
            placeholder="Ata adı"
            value={searchPatronymic}
            onChange={(e) => setSearchPatronymic(e.target.value)}
          />
          <input
            placeholder="Telefon"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <CiSearch className="searchBTN" />
        </div>

        <div className="rightPart">
          <select
            className="workersStatusChecker"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}>
            <option value="">Hamısı</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
        </div>
      </div>

      <div className="employeesTableWrapper">
        {loading ? (
          <p>Yüklənir...</p>
        ) : (
          <table className="employeesTable">
            <thead>
              <tr>
                <th>
                  <div className="th-content">
                    <span>
                      <HiArrowsUpDown className="tableArrowIcon" /> İstifadəçi
                      adı
                    </span>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>
                      <HiArrowsUpDown className="tableArrowIcon" /> Ad
                    </span>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>
                      <HiArrowsUpDown className="tableArrowIcon" /> Soyad
                    </span>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>
                      <HiArrowsUpDown className="tableArrowIcon" /> Ata adı
                    </span>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>
                      <HiArrowsUpDown className="tableArrowIcon" /> Telefon
                    </span>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>
                      <HiArrowsUpDown className="tableArrowIcon" /> Rollar
                    </span>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>
                      <HiArrowsUpDown className="tableArrowIcon" /> İş qrafiki
                    </span>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Status</span>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Düzəliş</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.username}</td>
                  <td>{emp.name}</td>
                  <td>{emp.surname}</td>
                  <td>{emp.patronymic}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.authorities?.join(", ")}</td>
                  <td>{emp.workSchedule}</td>
                  <td>
                    <span
                      className={`status ${
                        emp.enabled ? "active" : "passive"
                      }`}>
                      {getStatus(emp)}
                    </span>
                  </td>
                  <td>
                    <div className="actionsWrapper">
                      {icons.map((iconObj, index) => {
                        const Icon = iconObj.icon;
                        return (
                          <Icon
                            key={index}
                            className={`icon ${iconObj.className}`}
                            onClick={() => iconObj.action(emp)}
                          />
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeesList;
