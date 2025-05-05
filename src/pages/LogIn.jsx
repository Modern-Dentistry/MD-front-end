import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style/login.css";
import axios from "axios";
import "./login.css";

// Components
import TitleUpdater from "../components/TitleUpdater";

// Icons
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

// Images
import logo from "../assets/images/general/logos/logo.png";

// Zustand store
import useAuthStore from "../../stores/authStore";

function LogIn() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { login, error } = useAuthStore();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalLoading(true);

    try {
      const response = await axios.post(
        "http://159.89.3.81:5555/api/v1/auth/login",
        { username, password }
      );

      const tokenPair = response.data.tokenPair;
      console.log("TokenPair:", tokenPair);

      const loginSuccess = await useAuthStore
        .getState()
        .login({ username, password });

      console.log("Login Success:", loginSuccess);

      if (loginSuccess) {
        setTimeout(() => {
          navigate("/patients");
        }, 800);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="login-container">
      <TitleUpdater title={"LogIn"} />

      {/* Fullscreen Loading Spinner */}
      {localLoading && (
        <div className={`spinner-overlay ${localLoading ? "" : "hidden"}`}>
          <div className="spinner"></div>
        </div>
      )}

      <form className="login-form-container" onSubmit={handleLogin}>
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
            <input
              type="text"
              placeholder="İstifadəçinin adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="password-part">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

        {error && <p className="error-message">{error}</p>}

        <div className="login-btn">
          <button type="submit" disabled={localLoading}>
            Daxil ol
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
