import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Style
import "./assets/style/index.css";

// Pages
import LogIn from "./pages/LogIn";
import EmployeeDetails from "./pages/EmployeeDetails"
import EmployeeSchedule from "./pages/EmployeeSchedule";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/employee-schedule" element={<EmployeeSchedule />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
