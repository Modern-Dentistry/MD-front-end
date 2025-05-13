import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import "../../assets/style/ChangePassword/changepassword.css";

function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const handleSave = () => {
    if (newPassword !== repeatPassword) {
      setIsMatch(false);
    } else {
      setIsMatch(true);
      // Şifrə dəyişmə funksiyası buraya əlavə oluna bilər
    }
  };

  return (
    <div className="changePasswordContainer">
      <div className="changePasswordForm">
        <div className="inputRow">
          <div className="inputGroup">
            <label>İndiki şifrə <span className="required">*</span></label>
            <div className="inputWrapper">
              <input type={showOldPassword ? 'text' : 'password'} />
              <span
                className="eyeIcon"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <div className="inputGroup">
            <label>Yeni şifrə <span className="required">*</span></label>
            <div className="inputWrapper">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="eyeIcon"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>
        </div>

        <div className="inputGroup">
          <label>Yeni şifrəni təkrarlayın <span className="required">*</span></label>
          <div className="inputWrapper">
            <input
              type={showRepeatPassword ? 'text' : 'password'}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={!isMatch ? "errorInput" : ""}
            />
            <span
              className="eyeIcon"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              {showRepeatPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {!isMatch && (
            <p className="errorText">Şifrələr uyğun gəlmir</p>
          )}
        </div>

        <div className="buttonGroup">
          <button className="cancelButton">İmtina et</button>
          <button className="saveButton" onClick={handleSave}>Yadda saxla</button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
