import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Style
import "./assets/style/index.css";

// Pages
import LogIn from "./pages/LogIn";
import AddUser from "./pages/AddUser";
import ViewUser from "./pages/ViewUser";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path={'/view-user'} element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
