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
import Treatment from "./pages/patient/Treatment";
import History from "./pages/patient/History";
import EditHistory from "./pages/patient/EditHistory";
import Prescription from "./pages/patient/Prescription";
import ViewPrescription from "./pages/patient/ViewPrescription";
import CreateInsurance from "./pages/patient/CreateInsurance";
import ViewInsurance from "./pages/patient/ViewInsurance";
// import Video from "./pages/patient/Video";
import Insurance from "./pages/patient/Insurance";
// import History from "./pages/patient/History";
// import Appointments from "./pages/patient/Appointments";
// import Documents from "./pages/patient/Documents";
// import Notes from "./pages/patient/Notes";
import PlanCompare from "./pages/patient/PlanCompare";
import EditPlan from "./pages/patient/EditPlan";
import CreatePlan from "./pages/patient/CreatePlan";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route element={<Layout />}>
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/view-user" element={<ViewUser />} />
          <Route path="/add-patient" element={<AddPatient />} />

          {/* <Route path="/patient" element={<PatientLayout />}>
            <Route path="general" element={<General />} />
            <Route path="examination" element={<Examination />} />
            <Route path="plans" element={<Plans />}>
              <Route path="compare-plans" element={<PlanCompare />} />
            </Route>
            <Route path="insurance" element={<Insurance />} />
          </Route> */}

          <Route path="/patient" element={<PatientLayout />}>
            <Route path="general" element={<General />} />
            <Route path="examination" element={<Examination />} />
            <Route path="plans" element={<Plans />} />
            <Route path="edit-plan" element={<EditPlan />} />
            <Route path="create-plan" element={<CreatePlan />} />
            <Route path="compare-plans" element={<PlanCompare />} /> 
            <Route path="history" element={<History />} />
            <Route path="edit-history" element={<EditHistory />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="insurance/:id" element={<ViewInsurance mode={"view"} />} />
            <Route path="insurance/:id/edit" element={<ViewInsurance mode={"edit"} />} />
            <Route path="create-insurance" element={<CreateInsurance />} />
              <Route path="treatment" element={<Treatment />} />
            <Route path="prescription" element={<Prescription />} />
            <Route path="prescription/:id" element={<ViewPrescription mode="view" />} />
            <Route path="prescription/:id/edit" element={<ViewPrescription mode="edit" />} />
          </Route>
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


      </Routes>
    </BrowserRouter>
  </StrictMode >
);