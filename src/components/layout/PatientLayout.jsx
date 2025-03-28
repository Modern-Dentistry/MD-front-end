import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import '../../assets/style/layout.css'; // Import your CSS file for styling

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
            <Link to="/patient/general">General Info</Link>
          </button>
          <button className={isActive('/patient/plans') ? 'active' : ''}>
            <Link to="/patient/plans">Plans</Link>
          </button>
          <button className={isActive('/patient/video') ? 'active' : ''}>
            <Link to="/patient/video">Video</Link>
          </button>
          <button className={isActive('/patient/insurance') ? 'active' : ''}>
            <Link to="/patient/insurance">Insurance</Link>
          </button>
          <button className={isActive('/patient/history') ? 'active' : ''}>
            <Link to="/patient/history">History</Link>
          </button>
          <button className={isActive('/patient/appointments') ? 'active' : ''}>
            <Link to="/patient/appointments">Appointments</Link>
          </button>
          <button className={isActive('/patient/documents') ? 'active' : ''}>
            <Link to="/patient/documents">Documents</Link>
          </button>
          <button className={isActive('/patient/notes') ? 'active' : ''}>
            <Link to="/patient/notes">Notes</Link>
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