import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
import EmployeeDetails from "./pages/EmployeeDetails"
import EmployeeSchedule from "./pages/EmployeeSchedule";
import Appointments from "./pages/Appointments";
import AddNewAppointment from "./pages/AddNewAppointment";
import RandevuCard from "./pages/RandevuCard";

// Məlumatları buraya əlavə edək
const roomOptions = [
  { value: '1', label: 'Otaq 1' },
  { value: '2', label: 'Otaq 2' },
  { value: '3', label: 'Otaq 3' },
  { value: '4', label: 'Otaq 4' },
  { value: '5', label: 'Otaq 5' },
];

const employees = [
  {
    id: 1,
    name: "Rüstəm Məmmədov",
    position: "Diş həkimi",
    schedule: [
      { date: '2025-03-25', startTime: '09:00', endTime: '14:00', room: '1' },
      { date: '2025-03-26', startTime: '10:00', endTime: '17:00', room: '2' },
      { date: '2025-03-27', startTime: '09:00', endTime: '13:00', room: '3' },
      { date: '2025-03-28', startTime: '14:00', endTime: '18:00', room: '1' },
      { date: '2025-03-29', startTime: '09:00', endTime: '15:00', room: '2' }
    ]
  },
  {
    id: 2,
    name: "Aysel Hüseynova",
    position: "Ortodont",
    schedule: [
      { date: '2025-03-25', startTime: '11:00', endTime: '18:00', room: '2' },
      { date: '2025-03-26', startTime: '09:00', endTime: '14:00', room: '3' },
      { date: '2025-03-27', startTime: '13:00', endTime: '18:00', room: '1' },
      { date: '2025-03-28', startTime: '09:00', endTime: '13:00', room: '2' },
      { date: '2025-03-29', startTime: '14:00', endTime: '18:00', room: '3' }
    ]
  },
  {
    id: 3,
    name: "Fərid Qafarov",
    position: "Cərrah",
    schedule: [
      { date: '2025-03-25', startTime: '09:00', endTime: '13:00', room: '3' },
      { date: '2025-03-26', startTime: '14:00', endTime: '18:00', room: '1' },
      { date: '2025-03-27', startTime: '09:00', endTime: '15:00', room: '2' },
      { date: '2025-03-28', startTime: '10:00', endTime: '16:00', room: '3' },
      { date: '2025-03-29', startTime: '09:00', endTime: '12:00', room: '1' }
    ]
  },
];

// İş saatları
const WORK_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00'
];

// Həftə günlərinin qısaldılmış adları
const WEEKDAYS_SHORT = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route element={<Layout />}>
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/view-user" element={<ViewUser />} />
            <Route path="/add-patient" element={<AddPatient />} />


            <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/employee-schedule" element={<EmployeeSchedule />} />
          <Route path="/appointments" element={
            <Appointments 
              roomOptions={roomOptions} 
              employees={employees}
              WORK_HOURS={WORK_HOURS}
              WEEKDAYS_SHORT={WEEKDAYS_SHORT}
            />
          } />
          <Route path="/add-new-appointment" element={
            <AddNewAppointment 
              roomOptions={roomOptions} 
              employees={employees}
              WORK_HOURS={WORK_HOURS}
              WEEKDAYS_SHORT={WEEKDAYS_SHORT}
            />
          } />
          <Route path="/randevu-card" element={
            <RandevuCard 
              roomOptions={roomOptions} 
              employees={employees}
              WORK_HOURS={WORK_HOURS}
              WEEKDAYS_SHORT={WEEKDAYS_SHORT}
            />
          } />



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
      <ToastContainer position="top-right" autoClose={3000} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode >
);