import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Breadcrumb from "../Breadcrumb";
import '../../assets/style/layout.css'; // Import your CSS file for layout styles
import '../../assets/style/breadcrumb.css';

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <Breadcrumb />
      <div className="content-container">
        <Sidebar />
        <main className="main-content">

          <Outlet /> {/* This renders the child routes */}
        </main>
      </div>
    </div>
  );
};

export default Layout;