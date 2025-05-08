import React, { useEffect, useState } from "react";
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import "../../assets/style/EmployeesPage/employeespage.css";
import useEmployeeStore from "../../../stores/workerStore";

const EmployeesList = () => {
  const { workers, fetchWorkers, searchWorkers, removeWorker, loading } =
    useEmployeeStore();

  const [searchParams, setSearchParams] = useState({
    username: "",
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    status: "",
  });

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  useEffect(() => {
    setFilteredEmployees(workers);
  }, [workers]);

  const getStatus = (emp) => (emp.enabled ? "Aktiv" : "Passiv");

  const handleSearch = async () => {
    try {
      // If all search fields are empty, fetch all workers
      if (Object.values(searchParams).every((val) => !val)) {
        await fetchWorkers();
        return;
      }

      // Convert status to boolean for API
      const enabled =
        searchParams.status === "Aktiv"
          ? true
          : searchParams.status === "Passiv"
          ? false
          : undefined;

      // Call search API
      await searchWorkers({
        username: searchParams.username || undefined,
        name: searchParams.name || undefined,
        surname: searchParams.surname || undefined,
        patronymic: searchParams.patronymic || undefined,
        phone: searchParams.phone || undefined,
        enabled,
      });

      // Filter locally in the frontend if no backend data found
      const filtered = workers.filter((worker) => {
        return (
          (worker.username
            ?.toLowerCase()
            .includes(searchParams.username.toLowerCase()) ||
            !searchParams.username) &&
          (worker.name
            ?.toLowerCase()
            .includes(searchParams.name.toLowerCase()) ||
            !searchParams.name) &&
          (worker.surname
            ?.toLowerCase()
            .includes(searchParams.surname.toLowerCase()) ||
            !searchParams.surname) &&
          (worker.patronymic
            ?.toLowerCase()
            .includes(searchParams.patronymic.toLowerCase()) ||
            !searchParams.patronymic) &&
          (worker.phone?.includes(searchParams.phone) || !searchParams.phone) &&
          (getStatus(worker)
            .toLowerCase()
            .includes(searchParams.status.toLowerCase()) ||
            !searchParams.status)
        );
      });
      setFilteredEmployees(filtered);
    } catch (error) {
      console.error("Search error:", error);
      alert("Axtarış zamanı xəta baş verdi");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
    <>
    <div className="patientsListWrapper">
      <OrdinaryListHeader
        title="Pasiyentlər"
        addText="Yenisini əlavə et"
        addLink="/patients/add"
        exportLink="/patients/export"
      />

      <div className="patientsListSearch">
        <div className="leftPart">
          <input
            name="username"
            placeholder="İstifadəçi adı"
            value={searchParams.username}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <input
            name="name"
            placeholder="Ad"
            value={searchParams.name}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <input
            name="surname"
            placeholder="Soyad"
            value={searchParams.surname}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <input
            name="patronymic"
            placeholder="Ata adı"
            value={searchParams.patronymic}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <input
            name="phone"
            placeholder="Telefon"
            value={searchParams.phone}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="cursor-pointer" onClick={handleSearch}>
            <CiSearch className="searchBTN" />
          </button>
        </div>
        <div className="rightPart">
          <select
            className="workersStatusChecker"
            name="status"
            value={searchParams.status}
            onChange={handleInputChange}>
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
                    <div className="icons flex gap-3 cursor-pointer">
                      {icons.map((iconObj, idx) => (
                        <iconObj.icon
                          key={idx}
                          className={iconObj.className}
                          onClick={() => iconObj.action(emp)}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </>
  );
};

export default EmployeesList;
