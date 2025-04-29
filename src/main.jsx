import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AnimatePresence, motion } from "framer-motion";

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
import EmployeesList from "./pages/Employees/EmployeesList";
// import Video from "./pages/patient/Video";
import Insurance from "./pages/patient/Insurance";
import XRay from "./pages/patient/XRay";
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



import PatientsList from "./pages/Patients/PatientsList";
import QueueList from "./pages/Queue/QueueList";

import ReceivingOrders from "./pages/Laboratory/ReceivingOrders";

import AddStockImport from "./pages/stockImport/AddStockImport";
import StockImportList from "./pages/stockImport/StockImportList";
import ImportDetail from "./pages/stockImport/ImportDetail";

import AddStockOrder from "./pages/stockOrder/AddStockOrder";
import StockOrderList from "./pages/stockOrder/StockOrderList";
import StockOrderDetail from "./pages/stockOrder/StockOrderDetail";

import AddStockDelete from "./pages/stockDelete/addStockDelete";
import StockDeleteList from "./pages/stockDelete/stockDeleteList";
import StockDeleteDetail from "./pages/stockDelete/stockDeleteDetail";

import StockEntryList from "./pages/stockEntry/StockEntryList"; 
import StockEntryDetail from "./pages/stockEntry/StockEntryDetail";

import ProductUsageList from "./pages/productUsage/ProductUsageList";
import ProductUsageDetail from "./pages/productUsage/ProductUsageDetail";

import ExaminationList from "./pages/settings/examination/ExaminationList";
import AddExamination from "./pages/settings/examination/AddExamination";
import ExaminationDetail from "./pages/settings/examination/ExaminationDetail";

import ColorList from "./pages/settings/colors/ColorList";
import AddColor from "./pages/settings/colors/AddColor";
import ColorDetail from "./pages/settings/colors/ColorDetail";

import InsuranceList from "./pages/settings/insurance/InsuranceList";
import AddInsurance from "./pages/settings/insurance/AddInsurance";
import InsuranceDetail from "./pages/settings/insurance/InsuranceDetail";

import PriceCategoryList from "./pages/settings/priceCategories/PriceCategoryList";
import AddPriceCategory from "./pages/settings/priceCategories/AddPriceCategory";
import PriceCategoryDetail from "./pages/settings/priceCategories/PriceCategoryDetail";

import DentalSetList from "./pages/settings/dentalSet/DentalSetList";
import AddDentalSet from "./pages/settings/dentalSet/AddDentalSet";
import DentalSetDetail from "./pages/settings/dentalSet/DentalSetDetail";

import AddCabinet from "./pages/settings/cabinets/AddCabinet";
import CabinetList from "./pages/settings/cabinets/CabinetList";
import CabinetDetail from "./pages/settings/cabinets/CabinetDetail";

import ClinicStock from "./pages/ClinicStock";
  import AddOrder from "./pages/AddOrder";
import CabinetStock from "./pages/CabinetStock";
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

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageTransition><LogIn /></PageTransition>} />
        <Route element={<Layout />}>
          <Route path="/user/add" element={<PageTransition><AddUser /></PageTransition>} />
          <Route path="/user/:id" element={<PageTransition><ViewUser /></PageTransition>} />
          <Route path="/patient/add" element={<PageTransition><AddPatient /></PageTransition>} />
          <Route path="/employee/:id" element={<PageTransition><EmployeeDetails /></PageTransition>} />
          <Route path="/employee-schedule" element={<PageTransition><EmployeeSchedule /></PageTransition>} />
          <Route path="/appointments" element={
            <PageTransition>
              <Appointments 
                roomOptions={roomOptions} 
                employees={employees}
                WORK_HOURS={WORK_HOURS}
                WEEKDAYS_SHORT={WEEKDAYS_SHORT}
              />
            </PageTransition>
          } />
          <Route path="/add-new-appointment" element={
            <PageTransition>
              <AddNewAppointment 
                roomOptions={roomOptions} 
                employees={employees}
                WORK_HOURS={WORK_HOURS}
                WEEKDAYS_SHORT={WEEKDAYS_SHORT}
              />
            </PageTransition>
          } />
          <Route path="/randevu-card" element={
            <PageTransition>
              <RandevuCard 
                roomOptions={roomOptions} 
                employees={employees}
                WORK_HOURS={WORK_HOURS}
                WEEKDAYS_SHORT={WEEKDAYS_SHORT}
              />
            </PageTransition>
          } />
          <Route path="/stock/clinic" element={<PageTransition><ClinicStock /></PageTransition>} />
          <Route path="/stock/cabinet" element={<PageTransition><CabinetStock /></PageTransition>} />
          <Route path="/stock/import/" element={<PageTransition><StockImportList /></PageTransition>} />
          <Route path="/stock/import/add" element={<PageTransition><AddStockImport /></PageTransition>} />
          <Route path="/stock/import/:id" element={<PageTransition><ImportDetail mode={"view"} /></PageTransition>} />
          <Route path="/stock/import/:id/edit" element={<PageTransition><ImportDetail mode={"edit"} /></PageTransition>} />
          <Route path="/stock/order/" element={<PageTransition><StockOrderList /></PageTransition>} />
          <Route path="/stock/order/:id" element={<PageTransition><StockOrderDetail /></PageTransition>} />
          <Route path="/stock/order/add" element={<PageTransition><AddStockOrder /></PageTransition>} />
          <Route path="/stock/order/:id/edit" element={<PageTransition><StockOrderDetail mode={"edit"} /></PageTransition>} />
          <Route path="/stock/entry/" element={<PageTransition><StockEntryList /></PageTransition>} />
          <Route path="/stock/entry/:id" element={<PageTransition><StockEntryDetail /></PageTransition>} />
          <Route path="/stock/delete/" element={<PageTransition><StockDeleteList /></PageTransition>} />
          <Route path="/stock/delete/:id" element={<PageTransition><StockDeleteDetail /></PageTransition>} />
          <Route path="/stock/delete/add" element={<PageTransition><AddStockDelete /></PageTransition>} />
          <Route path="/stock/delete/:id/edit" element={<PageTransition><StockDeleteDetail mode={"edit"} /></PageTransition>} />
          <Route path="/stock/usage/" element={<PageTransition><ProductUsageList /></PageTransition>} />
          <Route path="/stock/usage/:id" element={<PageTransition><ProductUsageDetail /></PageTransition>} />
          <Route path="settings/examination/" element={<PageTransition><ExaminationList /></PageTransition>} />
          <Route path="settings/examination/add" element={<PageTransition><AddExamination /></PageTransition>} />
          <Route path="settings/examination/:id" element={<PageTransition><ExaminationDetail /></PageTransition>} />
          <Route path="settings/color/" element={<PageTransition><ColorList /></PageTransition>} />
          <Route path="settings/color/add" element={<PageTransition><AddColor /></PageTransition>} />
          <Route path="settings/color/:id" element={<PageTransition><ColorDetail /></PageTransition>} />
          <Route path="settings/insurance/" element={<PageTransition><InsuranceList /></PageTransition>} />
          <Route path="settings/insurance/add" element={<PageTransition><AddInsurance /></PageTransition>} />
          <Route path="settings/insurance/:id" element={<PageTransition><InsuranceDetail /></PageTransition>} />
          <Route path="settings/price-category/" element={<PageTransition><PriceCategoryList /></PageTransition>} />
          <Route path="settings/price-category/add" element={<PageTransition><AddPriceCategory /></PageTransition>} />
          <Route path="settings/price-category/:id" element={<PageTransition><PriceCategoryDetail /></PageTransition>} />
          <Route path="settings/price-category/:id/edit" element={<PageTransition><PriceCategoryDetail mode={"edit"} /></PageTransition>} />

          <Route path="settings/dental-set/" element={<PageTransition><DentalSetList /></PageTransition>} />
          <Route path="settings/dental-set/add" element={<PageTransition><AddDentalSet /></PageTransition>} />
          <Route path="settings/dental-set/:id" element={<PageTransition><DentalSetDetail /></PageTransition>} />

          <Route path="settings/cabinet/" element={<PageTransition><CabinetList /></PageTransition>} />
          <Route path="settings/cabinet/add" element={<PageTransition><AddCabinet /></PageTransition>} />
          <Route path="settings/cabinet/:id" element={<PageTransition><CabinetDetail /></PageTransition>} />


          <Route path="/patient/:id" element={<PatientLayout />}>
            <Route path="general" element={<PageTransition><General /></PageTransition>} />
            <Route path="examination" element={<PageTransition><Examination /></PageTransition>} />
            <Route path="plans" element={<PageTransition><Plans /></PageTransition>} />
            <Route path="plan/edit" element={<PageTransition><EditPlan /></PageTransition>} />
            <Route path="plan/create" element={<PageTransition><CreatePlan /></PageTransition>} />
            <Route path="compare-plans" element={<PageTransition><PlanCompare /></PageTransition>} />
            <Route path="history" element={<PageTransition><History /></PageTransition>} />
            <Route path="history/edit" element={<PageTransition><EditHistory /></PageTransition>} />
            <Route path="insurance" element={<PageTransition><Insurance /></PageTransition>} />
            <Route path="insurance/:id" element={<PageTransition><ViewInsurance mode={"view"} /></PageTransition>} />
            <Route path="insurance/:id/edit" element={<PageTransition><ViewInsurance mode={"edit"} /></PageTransition>} />
            <Route path="create-insurance" element={<PageTransition><CreateInsurance /></PageTransition>} />
            <Route path="treatment" element={<PageTransition><Treatment /></PageTransition>} />
            <Route path="xray" element={<PageTransition><XRay /></PageTransition>} />
            <Route path="prescription" element={<PageTransition><Prescription /></PageTransition>} />
            <Route path="prescription/:id" element={<PageTransition><ViewPrescription mode="view" /></PageTransition>} />
            <Route path="prescription/:id/edit" element={<PageTransition><ViewPrescription mode="edit" /></PageTransition>} />
          </Route>
          <Route path="/lab/order/add" element={<PageTransition><AddOrder /></PageTransition>} />
          <Route path="/employees" element={<PageTransition><EmployeesList /></PageTransition>} />
          <Route path="/patients" element={<PageTransition><PatientsList /></PageTransition>} />
          <Route path="/queue" element={<PageTransition><QueueList /></PageTransition>} />
          <Route path="/receiving-orders" element={<PageTransition><ReceivingOrders /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
