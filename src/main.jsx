import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Style
import "./assets/style/index.css";

// Pages
import LogIn from "./pages/LogIn";
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
