import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, motion } from "framer-motion";

// Style
import "./assets/style/index.css";

// Pages
import Layout from "./components/layout/Layout";
import PatientLayout from "./components/layout/PatientLayout";
import LogIn from "./pages/LogIn";
import AddUser from "./pages/AddUser";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";
// import AddPatient from "./pages/AddPatient";
import General from "./pages/patient/General"
// import EmployeeAdd from "./pages/Employees/EmployeeAddTest";
import EmployeeAdd from "./pages/Employees/EmployeeAdd";
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
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditSpeciality from "./pages/SpecialitiesPage/EditSpeciality";
import AcademicDegrees from "./pages/AcademicDegrees/AcademicDegrees";
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
import EmployeeSchedule from "./pages/Employees/EmployeeSchedule";
import Appointments from "./pages/Appointments";
import AddNewAppointment from "./pages/AddNewAppointment";
import RandevuCard from "./pages/RandevuCard";
import Specialities from "./pages/SpecialitiesPage/Specialities";
import AddSpeciality from "./pages/SpecialitiesPage/AddSpeciality";
import EditMetal from "./pages/Metals/EditMetal";

import OrderStatus from "./pages/OrderStatus/OrderStatus";

import Ceramics from "./pages/Ceramics/Ceramics";

// Blaclist Page
import Blacklist from "./pages/Blacklist/Blacklist";
// Blaclist Page

import AddAcademicDegrees from "./pages/AcademicDegrees/AddAcademicDegrees";
import EditAcademicDegrees from "./pages/AcademicDegrees/EditAcademicDegrees";

import Metals from "./pages/Metals/Metals";

import PatientsList from "./pages/Patients/PatientsList";
import QueueList from "./pages/Queue/QueueList";

import ReceivingOrders from "./pages/Laboratory/ReceivingOrders";

import AddStockImport from "./pages/stockImport/AddStockImport";
import StockImportList from "./pages/stockImport/StockImportList";
import ImportDetail from "./pages/stockImport/ImportDetail";

import AddStockOrder from "./pages/stockOrder/AddStockOrder";
import StockOrderList from "./pages/stockOrder/StockOrderList";
import StockOrderDetail from "./pages/stockOrder/StockOrderDetail";

import AddStockDelete from "./pages/stockDelete/AddStockDelete";
import StockDeleteList from "./pages/stockDelete/StockDeleteList";
import StockDeleteDetail from "./pages/stockDelete/StockDeleteDetail";

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
import AddMetal from "./pages/Metals/AddMetal";
import EditCeramic from "./pages/Ceramics/EditCeramic";
import AddCeramic from "./pages/Ceramics/AddCeramic";
import AddOrderStatus from "./pages/OrderStatus/AddOrderStatus";
import EditOrderStatus from "./pages/OrderStatus/EditOrderStatus";
import Permissions from "./pages/PermissionsPage/Permissions";
import AddPermission from "./pages/PermissionsPage/AddPermisssion";
import EditPermission from "./pages/PermissionsPage/EditPermission";
import BlacklistReasons from "./pages/BlackListReasons/BlacklistReasons";
import AddReason from "./pages/BlackListReasons/AddReason";
import EditReason from "./pages/BlackListReasons/EditReason";
import PatientAdd from "./pages/Patients/PatientAdd";
import EmployeeEdit from "./pages/Employees/EmployeeEdit";
import PatientEdit from "./pages/patient/PatientEdit";
import ReportsPage from "./pages/Reports/ReportsPage";
import AddProductCategory from "./pages/ProductCategory/AddProductCategory";
import ProductCategory from "./pages/ProductCategory/ProductCategory";
import EditProductCategory from "./pages/ProductCategory/EditProductCategory";
import Products from "./pages/ProductCategory/Products";
import AddProduct from "./pages/ProductCategory/AddProduct";
import PatientReport from "./pages/patient/PatientReport";
import AddQueue from "./pages/Queue/AddQueue";
import EditQueue from "./pages/Queue/EditQueue";
import EditProduct from "./pages/ProductCategory/EditProduct";
// Məlumatları buraya əlavə edək
const roomOptions = [
  { value: "1", label: "Otaq 1" },
  { value: "2", label: "Otaq 2" },
  { value: "3", label: "Otaq 3" },
  { value: "4", label: "Otaq 4" },
  { value: "5", label: "Otaq 5" },
];

const employees = [
  {
    id: 1,
    name: "Rüstəm Məmmədov",
    position: "Diş həkimi",
    schedule: [
      { date: "2025-03-25", startTime: "09:00", endTime: "14:00", room: "1" },
      { date: "2025-03-26", startTime: "10:00", endTime: "17:00", room: "2" },
      { date: "2025-03-27", startTime: "09:00", endTime: "13:00", room: "3" },
      { date: "2025-03-28", startTime: "14:00", endTime: "18:00", room: "1" },
      { date: "2025-03-29", startTime: "09:00", endTime: "15:00", room: "2" },
    ],
  },
  {
    id: 2,
    name: "Aysel Hüseynova",
    position: "Ortodont",
    schedule: [
      { date: "2025-03-25", startTime: "11:00", endTime: "18:00", room: "2" },
      { date: "2025-03-26", startTime: "09:00", endTime: "14:00", room: "3" },
      { date: "2025-03-27", startTime: "13:00", endTime: "18:00", room: "1" },
      { date: "2025-03-28", startTime: "09:00", endTime: "13:00", room: "2" },
      { date: "2025-03-29", startTime: "14:00", endTime: "18:00", room: "3" },
    ],
  },
  {
    id: 3,
    name: "Fərid Qafarov",
    position: "Cərrah",
    schedule: [
      { date: "2025-03-25", startTime: "09:00", endTime: "13:00", room: "3" },
      { date: "2025-03-26", startTime: "14:00", endTime: "18:00", room: "1" },
      { date: "2025-03-27", startTime: "09:00", endTime: "15:00", room: "2" },
      { date: "2025-03-28", startTime: "10:00", endTime: "16:00", room: "3" },
      { date: "2025-03-29", startTime: "09:00", endTime: "12:00", room: "1" },
    ],
  },
];

// İş saatları
const WORK_HOURS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

// Həftə günlərinin qısaldılmış adları
const WEEKDAYS_SHORT = ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"];

// Create a client
const queryClient = new QueryClient();
// src/index.js və ya src/App.js
console.log("✅ API_BASE_URL:", import.meta.env.VITE_BASE_URL);
console.log("✅ All Env Variables:", import.meta.env);


const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{ width: "100%", height: "100%" }}>
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div className="app-wrapper">
        <Routes location={location} key={location.pathname}>
          {/* Authentication Routes */}
            <Route path="/" element={<LogIn />} />
          <Route element={<Layout />}>
            <Route path="/product-categories" element={<ProductCategory/>}/>
            <Route path="/product-categories/add-new" element={<AddProductCategory/>}/>
            <Route path="/product-categories/edit-category/:id" element={<EditProductCategory/>}/>
            <Route path="product-categories/:name" element={<Products/>}/>
            <Route path="product-categories/:name/add-new" element={<AddProduct/>}/>
            <Route path="product-categories/:name/edit-product/:id" element={<EditProduct/>}/>
            <Route path="/patients/add-patient" element={<PatientAdd/>}/>
            <Route path="/blacklist-reasons" element={<BlacklistReasons/>}/>
            <Route path="/add-reason" element={<AddReason/>}/>
            <Route path="/edit-reason" element={<EditReason/>}/>
            {/* Default Route */}
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/edit-speciality/:id" element={<EditSpeciality />} />
            <Route path="/add-speciality" element={<AddSpeciality />} />
            <Route path="/blacklist" element={<Blacklist />} />
            <Route path="/change-password" element={<ChangePassword />} />
            {/* <Route path="*" element={<PatientsList />} /> */}
            <Route path="/ceramics" element={<Ceramics />} />
            <Route path="/edit-ceramic/:id" element={<EditCeramic />} />
            <Route path="/add-ceramic" element={<AddCeramic />} />
            {/* <Route path="/employee-add" element={<EmployeeAdd />} /> */}

            <Route path="/metals" element={<Metals />} />
            <Route path="/edit-metal/:id" element={<EditMetal />} />
            <Route path="/add-metal" element={<AddMetal />} />
            <Route path="/academic-degrees" element={<AcademicDegrees />} />
            <Route path="/edit-degree/:id" element={<EditAcademicDegrees />} />
            <Route path="/add-degree" element={<AddAcademicDegrees />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/add-order-status" element={<AddOrderStatus />} />
            <Route path="/edit-order-status" element={<EditOrderStatus />} />

            <Route path="/permissions" element={<Permissions />} />
            <Route path="/add-permission" element={<AddPermission />} />
            <Route path="/edit-permission" element={<EditPermission />} />
            {/* User Management Routes */}
            <Route path="/employee/:id" element={<EmployeeDetails />} />

            {/* Patient Management Routes */}
            {/* <Route path="/patient/add" element={<AddPatient />} /> */}
            <Route path="/patients" element={<PatientsList />} />
            <Route path="patients/patient/:id" element={<PatientLayout />}>
              <Route path="general" element={<General />} />
              {/* <Route path="video" element={<Video />} /> */}
              <Route path="edit" element={<PatientEdit />} />
              <Route path="report" element={<PatientReport />} />
              <Route path="examination" element={<Examination />} />
              <Route path="plans" element={<Plans />} />
              <Route path="plan/edit" element={<EditPlan />} />
              <Route path="plan/create" element={<CreatePlan />} />
              <Route path="compare-plans" element={<PlanCompare />} />
              <Route path="history" element={<History />} />
              <Route path="history/edit" element={<EditHistory />} />
              <Route path="insurance" element={<Insurance />} />
              <Route
                path="insurance/:id"
                element={<ViewInsurance mode="view" />}
              />
              <Route
                path="insurance/:id/edit"
                element={<ViewInsurance mode="edit" />}
              />
              <Route path="insurance/create" element={<CreateInsurance />} />
              <Route path="treatment" element={<Treatment />} />
              <Route path="xray" element={<XRay />} />
              <Route path="prescription" element={<Prescription />} />
              <Route
                path="prescription/:id"
                element={<ViewPrescription mode="view" />}
              />
              <Route
                path="prescription/:id/edit"
                element={<ViewPrescription mode="edit" />}
              />
            </Route>

            {/* Appointment Management Routes */}
            <Route
              path="/appointments"
              element={
                <Appointments
                  roomOptions={roomOptions}
                  employees={employees}
                  WORK_HOURS={WORK_HOURS}
                  WEEKDAYS_SHORT={WEEKDAYS_SHORT}
                />
              }
            />
            <Route
              path="/appointment/add"
              element={
                <AddNewAppointment
                  roomOptions={roomOptions}
                  employees={employees}
                  WORK_HOURS={WORK_HOURS}
                  WEEKDAYS_SHORT={WEEKDAYS_SHORT}
                />
              }
            />
            <Route
              path="/appointment/card"
              element={
                <RandevuCard
                  roomOptions={roomOptions}
                  employees={employees}
                  WORK_HOURS={WORK_HOURS}
                  WEEKDAYS_SHORT={WEEKDAYS_SHORT}
                />
              }
            />

            {/* Employee Management Routes */}
            <Route path="/employees" element={<EmployeesList />}>
            </Route>
            <Route path="/employees/employee-add" element={<EmployeeAdd />} />
            <Route path="/employees/employee/:id" element={<EmployeeDetails />} />
            <Route path="/employees/edit-employee/:id" element={<EmployeeEdit />} />
            <Route path="/employees/employee-schedule" element={<EmployeeSchedule />} />

            {/* Stock Management Routes */}
            <Route path="/stock/clinic" element={<ClinicStock />} />
            <Route path="/stock/cabinet" element={<CabinetStock />} />

            {/* Stock Import Routes */}
            <Route path="/stock/import" element={<StockImportList />} />
            <Route path="/stock/import/add" element={<AddStockImport />} />
            <Route
              path="/stock/import/:id"
              element={<ImportDetail mode="view" />}
            />
            <Route
              path="/stock/import/:id/edit"
              element={<ImportDetail mode="edit" />}
            />

            {/* Stock Order Routes */}
            <Route path="/stock/order" element={<StockOrderList />} />
            <Route path="/stock/order/:id" element={<StockOrderDetail />} />
            <Route path="/stock/order/add" element={<AddStockOrder />} />
            <Route
              path="/stock/order/:id/edit"
              element={<StockOrderDetail mode="edit" />}
            />

            {/* Stock Entry Routes */}
            <Route path="/stock/entry" element={<StockEntryList />} />
            <Route path="/stock/entry/:id" element={<StockEntryDetail />} />

            {/* Stock Delete Routes */}
            <Route path="/stock/delete" element={<StockDeleteList />} />
            <Route path="/stock/delete/:id" element={<StockDeleteDetail />} />
            <Route path="/stock/delete/add" element={<AddStockDelete />} />
            <Route
              path="/stock/delete/:id/edit"
              element={<StockDeleteDetail mode="edit" />}
            />

            {/* Stock Usage Routes */}
            <Route path="/stock/usage" element={<ProductUsageList />} />
            <Route path="/stock/usage/:id" element={<ProductUsageDetail />} />

            {/* Settings Routes */}
            {/* Examination Settings */}
            <Route path="/settings/examination" element={<ExaminationList />} />
            <Route
              path="/settings/examination/add"
              element={<AddExamination />}
            />
            <Route
              path="/settings/examination/:id"
              element={<ExaminationDetail />}
            />

            {/* Color Settings */}
            <Route path="/settings/color" element={<ColorList />} />
            <Route path="/settings/color/add" element={<AddColor />} />
            <Route path="/settings/color/:id" element={<ColorDetail />} />

            {/* Insurance Settings */}
            <Route path="/settings/insurance" element={<InsuranceList />} />
            <Route path="/settings/insurance/add" element={<AddInsurance />} />
            <Route
              path="/settings/insurance/:id"
              element={<InsuranceDetail />}
            />

            {/* Price Category Settings */}
            <Route
              path="/settings/price-category"
              element={<PriceCategoryList />}
            />
            <Route
              path="/settings/price-category/add"
              element={<AddPriceCategory />}
            />
            <Route
              path="/settings/price-category/:id"
              element={<PriceCategoryDetail />}
            />
            <Route
              path="/settings/price-category/:id/edit"
              element={<PriceCategoryDetail mode="edit" />}
            />

            {/* Dental Set Settings */}
            <Route path="/settings/dental-set" element={<DentalSetList />} />
            <Route path="/settings/dental-set/add" element={<AddDentalSet />} />
            <Route
              path="/settings/dental-set/:id"
              element={<DentalSetDetail />}
            />

            {/* Cabinet Settings */}
            <Route path="/settings/cabinet" element={<CabinetList />} />
            <Route path="/settings/cabinet/add" element={<AddCabinet />} />
            <Route path="/settings/cabinet/:id" element={<CabinetDetail />} />

            {/* Laboratory Routes */}
            <Route path="/lab/order/add" element={<AddOrder />} />
            <Route path="/receiving-orders" element={<ReceivingOrders />} />

            {/* Queue Management */}
            <Route path="/queue" element={<QueueList />}/>
            <Route path="/queue/add-new" element={<AddQueue/>}/>
            <Route path="/queue/edit-queue/:id" element={<EditQueue/>}/>
          </Route>
        </Routes>
      </div>
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
