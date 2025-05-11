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
          <button className={isActive(`/patient/${id}/general`) ? 'active' : ''}>
            <Link to={`/patients/patient/${id}/general`}>
              <FontAwesomeIcon icon={faUser} /> Ümumi
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/examination`) ? 'active' : ''}>
            <Link to={`/patient/${id}/examination`}>
              <FontAwesomeIcon icon={faStethoscope} /> Müayinə
            </Link>
          </button>
          <button className={isActive([`/patient/${id}/plans`, `/patient/${id}/edit-plan`, `/patient/${id}/create-plan`]) ? 'active' : ''}>
            <Link to={`/patient/${id}/plans`}>
              <FontAwesomeIcon icon={faClipboardList} /> Planlar
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/treatment`) ? 'active' : ''}>
            <Link to={`/patient/${id}/treatment`}>
              <FontAwesomeIcon icon={faNotesMedical} /> Müalicə
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/history`) ? 'active' : ''}>
            <Link to={`/patient/${id}/history`}>
              <FontAwesomeIcon icon={faHistory} /> Anamnez
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/insurance`) ? 'active' : ''}>
            <Link to={`/patient/${id}/insurance`}>
              <FontAwesomeIcon icon={faShieldAlt} /> Sığorta
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/prescription`) ? 'active' : ''}>
            <Link to={`/patient/${id}/prescription`}>
              <FontAwesomeIcon icon={faPrescriptionBottleMedical} /> Resept
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/xray`) ? 'active' : ''}>
            <Link to={`/patient/${id}/xray`}>
              <FontAwesomeIcon icon={faXRay} /> Rentgen
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/images`) ? 'active' : ''}>
            <Link to={`/patient/${id}/images`}>
              <FontAwesomeIcon icon={faImage} /> Şəkil
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/video`) ? 'active' : ''}>
            <Link to={`/patient/${id}/video`}>
              <FontAwesomeIcon icon={faVideo} /> Video
            </Link>
          </button>
          <button className={isActive(`/patient/${id}/report`) ? 'active' : ''}>
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