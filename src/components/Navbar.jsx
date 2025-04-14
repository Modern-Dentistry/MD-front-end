import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Ana Səhifə</Link>
        <Link to="/employee-schedule" className="nav-link">İş Cədvəli</Link>
        <Link to="/appointments" className="nav-link">Qəbula Yazılma</Link>
      </div>
    </nav>
  );
}

export default Navbar; 