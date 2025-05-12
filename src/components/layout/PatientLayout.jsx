import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import '../../assets/style/layout.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
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

import { useParams } from "react-router-dom"; // Import useParams

const PatientLayout = () => {
  const location = useLocation();
  const { id } = useParams(); // Get the patient ID from the URL

  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some(path => location.pathname === path);
    }
    return location.pathname === paths;
  };

  return (
    <div className="patient-layout">
      <header className="patient-header">
        <nav className="patient-nav">
          <button className={isActive(`/patients/patient/${id}/general`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/general`}>
              <FontAwesomeIcon icon={faUser} /> Ümumi
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/examination`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/examination`}>
              <FontAwesomeIcon icon={faStethoscope} /> Müayinə
            </Link>
          </button>
          <button className={isActive([`/patients/patient/${id}/plans`, `/patients/patient/${id}/edit-plan`, `/patients/patient/${id}/create-plan`]) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/plans`}>
              <FontAwesomeIcon icon={faClipboardList} /> Planlar
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/treatment`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/treatment`}>
              <FontAwesomeIcon icon={faNotesMedical} /> Müalicə
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/history`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/history`}>
              <FontAwesomeIcon icon={faHistory} /> Anamnez
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/insurance`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/insurance`}>
              <FontAwesomeIcon icon={faShieldAlt} /> Sığorta
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/prescription`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/prescription`}>
              <FontAwesomeIcon icon={faPrescriptionBottleMedical} /> Resept
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/xray`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/xray`}>
              <FontAwesomeIcon icon={faXRay} /> Rentgen
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/images`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/images`}>
              <FontAwesomeIcon icon={faImage} /> Şəkil
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/video`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/video`}>
              <FontAwesomeIcon icon={faVideo} /> Video
            </Link>
          </button>
          <button className={isActive(`/patients/patient/${id}/report`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/report`}>
              <FontAwesomeIcon icon={faFileAlt} /> Hesabat
            </Link>
          </button>
        </nav>
      </header>
      <main className="patient-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PatientLayout;