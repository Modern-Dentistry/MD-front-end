import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../../assets/style/layout.css'; // Import your CSS file for layout styles
const Layout = () => {
  return (
    <div className="app-container">
      <Header />
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