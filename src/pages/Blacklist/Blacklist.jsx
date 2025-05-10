import React, { useState } from 'react';

// Components
import OrdinaryListHeader from '../../components/OrdinaryList/OrdinaryListHeader';
import OrdinaryList from '../../components/OrdinaryList/OrdinaryList';
import Modal from '../../components/Modal';
import AddBlacklistedPatient from './AddBlacklistedPatient';

// Icons
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

// Style
import "../../assets/style/BlacklistPage/blacklist.css";

function Blacklist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(true);

  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const handleDeleteClick = (row) => {
    setSelectedUser(row);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    alert(`Pasiyent silindi: ${selectedUser?.username}`);
    setSelectedUser(null);
  };

  const handleSavePatient = () => {
    alert(`Əlavə edildi: ${selectedPatient} - ${selectedReason}`);
    setIsAddPatientModalOpen(false);
    setSelectedPatient('');
    setSelectedReason('');
  };

  const icons = [
    {
      icon: GoTrash,
      action: handleDeleteClick,
      className: "delete"
    }
  ];

  const employeesData = [
    { patient: "Elmira Aliyeva", pin: "7F2345", phone: "(050) 123 45 67", addDate: "02.05.2025", reason: "Problemli müştəri" },
    { patient: "Murad Quliyev", pin: "8A9876", phone: "(051) 456 78 90", addDate: "02.05.2025", reason: "Etik pozuntu" }
  ];

  const filteredData = employeesData.filter((employee) => {
    const fullText = `${employee.patient} ${employee.pin} ${employee.phone}`.toLowerCase();
    return fullText.includes(searchQuery.toLowerCase());
  });

  const patientList = [
    { name: "Elmira", surname: "Aliyeva", pin: "7F2345" },
    { name: "Murad", surname: "Quliyev", pin: "8A9876" }
  ];

  const reasonList = [
    "Problemli müştəri", "Təkrar zənglər", "Etik pozuntular"
  ];

  return (
    <div className="blacklistContainer">
        <OrdinaryListHeader
      title="Qara siyahıdakı pasiyentlər"
      addText="Yenisini əlavə et"
      addLink="#"
      exportLink="/blacklist/export"
      onAddClick={() => setIsAddPatientModalOpen(true)}
    />

      <div className="blacklistQuickSearch">
        <div className="leftPart">
          <input type="text" placeholder='Ad Soyad' onChange={(e) => setSearchQuery(e.target.value)} />
          <input type="text" placeholder='FIN kodu' onChange={(e) => setSearchQuery(e.target.value)} />
          <input type="text" placeholder='Mobil nömrə' onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <CiSearch className='searchBTNBlacklist' />
      </div>

      <OrdinaryList
        tableHead={[
          "Pasiyent",
          "Fin kodu",
          "Mobil nömrə",
          "Əlavə olunma tarixi",
          "Səbəb",
        ]}
        tableData={filteredData}
        icons={icons}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Əminsinizmi?"
        message={<strong>Pasiyent qara siyahıdan çıxarılacaq.</strong>}
        cancelText="İmtina"
        confirmText="Təsdiq"
        onConfirm={handleConfirmDelete}
        confirmButtonClass="confirm-button"
      />

      <AddBlacklistedPatient
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSave={handleSavePatient}
        patients={patientList}
        reasons={reasonList}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
      />
    </div>
  );
}

export default Blacklist;
