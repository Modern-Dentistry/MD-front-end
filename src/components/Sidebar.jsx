import React from "react";

// Images
import logo from "../assets/images/general/logos/logo.png";

// Style
import "../assets/style/sidebar.css";

// Icons
import { CiStethoscope } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_topPart">
          <img src={logo} alt="Müasir Stomalogiya logo" />
          <p className="sidebar_logo_title">
            Müasir
            <br />
            Stomatologiya
          </p>
        </div>
        <div className="sidebar-elements">
          <div className="element active">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
          <div className="element">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
          <div className="element">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
          <div className="element">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
          <div className="element">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
          <div className="element">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
          <div className="element">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
          <div className="element">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
          <div className="element">
            <div className="element-left">
              <CiStethoscope className="element-icon" />
              <p className="element-title">İşçilər</p>
            </div>
            <div className="element-right">
              <IoIosArrowBack className="arrow-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
