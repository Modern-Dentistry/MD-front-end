import { LuBell } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

import adminUser from "../../assets/images/header-component-images/adminPFP.jpeg";

import "../../assets/style/header.css";

function Header() {
  return (
    <>
      <header>
        <div className="header-elements">
          <div className="notification-button">
            <LuBell className="bell-icon" />
            <p className="new-notif-icon"></p>
          </div>
          <div className="add-new-date">
            <LuCalendarPlus className="calendar-icon" />
            <p className="add-new-date-title">Yeni randevu</p>
          </div>
          <div className="user-profile-link">
            <img src={adminUser} alt="" />
            <div className="rightPart">
              <div className="title">
                <p className="namePart">Admin</p>
                <p className="rolePart">Vəzifə</p>
              </div>
              <IoIosArrowBack className="arrowIcon" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
