// Header.js
import { useState } from "react";
import { LuBell } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { FiLock, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

import adminUser from "../../assets/images/header-component-images/adminPFP.jpeg";

import "../../assets/style/header.css";

localStorage.setItem("notification", "true");

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const showNotificationDot = localStorage.getItem("notification") !== "false";

  return (
    <>
      <header className="headerContainer">
        <div className="headerElements">
          {/* <div className="headerNotificationButton">
            <LuBell className="headerBellIcon headerIcon" />
            {showNotificationDot && <p className="headerNewNotifIcon"></p>}
          </div> */}
          <LuCalendarPlus className="headerCalendarIcon headerIcon" />
          <AiOutlineUserAdd className="headerIcon" />
          <div
            className="headerUserProfileLink"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
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
                <div className="headerDropdownItem">
                  <FiLogOut className="headerDropdownIcon" />
                  <Link to="/">Çıxış</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
