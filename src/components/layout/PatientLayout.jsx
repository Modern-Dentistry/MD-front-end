import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import '../../assets/style/layout.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faStethoscope, 
  faClipboardList, 
  faNotesMedical,
  faHistory,
  faShieldAlt,
  faPrescriptionBottleMedical,
  faXRay,
  faImage,
  faVideo,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';

const PatientLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="patient-layout">
      <header className="patient-header">
        <nav className="patient-nav">
          <button className={isActive('/patient/general') ? 'active' : ''}>
            <Link to="/patient/general">
              <FontAwesomeIcon icon={faUser} /> Ümumi
            </Link>
          </button>
          <button className={isActive('/patient/examination') ? 'active' : ''}>
            <Link to="/patient/examination">
              <FontAwesomeIcon icon={faStethoscope} /> Müayinə
            </Link>
          </button>
          <button className={isActive('/patient/plans') ? 'active' : ''}>
            <Link to="/patient/plans">
              <FontAwesomeIcon icon={faClipboardList} /> Planlar
            </Link>
          </button>
          <button className={isActive('/patient/treatment') ? 'active' : ''}>
            <Link to="/patient/treatment">
              <FontAwesomeIcon icon={faNotesMedical} /> Müalicə
            </Link>
          </button>
          <button className={isActive('/patient/history') ? 'active' : ''}>
            <Link to="/patient/history">
              <FontAwesomeIcon icon={faHistory} /> Anamnez
            </Link>
          </button>
          <button className={isActive('/patient/insurance') ? 'active' : ''}>
            <Link to="/patient/insurance">
              <FontAwesomeIcon icon={faShieldAlt} /> Sığorta
            </Link>
          </button>
          <button className={isActive('/patient/prescription') ? 'active' : ''}>
            <Link to="/patient/prescription">
              <FontAwesomeIcon icon={faPrescriptionBottleMedical} /> Resept
            </Link>
          </button>
          <button className={isActive('/patient/xray') ? 'active' : ''}>
            <Link to="/patient/xray">
              <FontAwesomeIcon icon={faXRay} /> Rentgen
            </Link>
          </button>
          <button className={isActive('/patient/images') ? 'active' : ''}>
            <Link to="/patient/images">
              <FontAwesomeIcon icon={faImage} /> Şəkil
            </Link>
          </button>
          <button className={isActive('/patient/video') ? 'active' : ''}>
            <Link to="/patient/video">
              <FontAwesomeIcon icon={faVideo} /> Video
            </Link>
          </button>
          <button className={isActive('/patient/report') ? 'active' : ''}>
            <Link to="/patient/report">
              <FontAwesomeIcon icon={faFileAlt} /> Hesabat
            </Link>
          </button>
        </nav>
      </header>
      <main className="patient-content">
        <Outlet /> {/* Renders the child routes */}
      </main>
    </div>
  );
};

export default PatientLayout;