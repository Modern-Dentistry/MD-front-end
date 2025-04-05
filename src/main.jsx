import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Style
import "./assets/style/index.css";

// Pages
import Layout from "./components/layout/Layout";
import PatientLayout from "./components/layout/PatientLayout";
import LogIn from "./pages/LogIn";
import AddUser from "./pages/AddUser";
import ViewUser from "./pages/ViewUser";
import AddPatient from "./pages/AddPatient";
import General from "./pages/patient/General";
import Examination from "./pages/patient/Examination";
import Plans from "./pages/patient/Plans";
// import Video from "./pages/patient/Video";
// import Insurance from "./pages/patient/Insurance";
// import History from "./pages/patient/History";
// import Appointments from "./pages/patient/Appointments";
// import Documents from "./pages/patient/Documents";
// import Notes from "./pages/patient/Notes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route element={<Layout />}>
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/view-user" element={<ViewUser />} />
          <Route path="/add-patient" element={<AddPatient />} />

          <Route path="/patient" element={<PatientLayout />}>
            <Route path="general" element={<General />} />
            <Route path="examination" element={<Examination />} />
            <Route path="plans" element={<Plans />} />
            {/*

           <Route path="general" element={<General />} />
          <Route path="plans" element={<Plans />} />
          <Route path="video" element={<Video />} />
          <Route path="insurance" element={<Insurance />} />
          <Route path="history" element={<History />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="documents" element={<Documents />} />
          <Route path="notes" element={<Notes />} /> */}
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);