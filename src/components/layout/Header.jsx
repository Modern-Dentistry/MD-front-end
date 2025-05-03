// Header.js
import { useState } from "react";
import { LuCalendarPlus } from "react-icons/lu";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { FiLock, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/authStore.js";
import "../logout.css"; // Burada CSS import olunur

import adminUser from "../../assets/images/header-component-images/adminPFP.jpeg";
import "../../assets/style/header.css";

localStorage.setItem("notification", "true");

function Header() {
  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const showNotificationDot = localStorage.getItem("notification") !== "false";

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }, 1500); // Spinner göstərmək üçün 1.5 saniyəlik gecikmə
  };

  const Spinner = () => (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  );

  return (
    <>
      {isLoggingOut && <Spinner />}
      <header className="headerContainer">
        <div className="headerElements">
          <LuCalendarPlus className="headerCalendarIcon headerIcon" />
          <AiOutlineUserAdd className="headerIcon" />
          <div
            className="headerUserProfileLink"
            onClick={() => setMenuOpen((prev) => !prev)}>
            <img src={adminUser} alt="Admin" />
            <div className="headerRightPart">
              <div className="headerTitle">
                <p className="headerNamePart">Admin</p>
                <p className="headerRolePart">Vəzifə</p>
              </div>
              <IoIosArrowBack className="headerArrowIcon" />
            </div>

            {menuOpen && (
              <div className="headerDropdownMenu">
                <div className="headerDropdownItem">
                  <FiLock className="headerDropdownIcon" />
                  <Link to="/change-password">Şifrəmi dəyiş</Link>
                </div>
                <button onClick={handleLogout} className="headerDropdownItem logout-btn">
                  <FiLogOut className="headerDropdownIcon" />
                  <span>Çıxış</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
