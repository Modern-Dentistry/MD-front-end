import React, { useState } from "react";
import "../assets/style/login.css";

// Components
import TitleUpdater from "../components/TitleUpdater";

// Icons
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

// Images
import logo from "../assets/images/general/logos/logo.png";

function LogIn() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="login-container">
      <TitleUpdater title={"LogIn"} />
      <div className="login-form-container">
        <div className="topPart">
          <img src={logo} alt="Müasir Stomatologiya" />
          <p className="logo-title">
            Müasir <br />
            Stomatologiya
          </p>
        </div>
        <p className="logo-motto">Uğur təbəssümdən başlayır!</p>
        <div className="inputs-container">
          <div className="username-part">
            <input type="text" placeholder="İstifadəçinin adı" />
          </div>
          <div className="password-part">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Şifrə"
            />
            {passwordShown ? (
              <GoEyeClosed
                className="eye-btn"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FiEye className="eye-btn" onClick={togglePasswordVisibility} />
            )}
          </div>
        </div>

        <div className="remember-me" onClick={() => setRememberMe(!rememberMe)}>
          <div className={`custom-checkbox ${rememberMe ? "checked" : ""}`}>
            {rememberMe && <FaCheck className="check-icon" />}
          </div>
          <label>Yadda saxla</label>
        </div>

        <div className="login-btn">
          <button type="submit">Daxil ol</button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
