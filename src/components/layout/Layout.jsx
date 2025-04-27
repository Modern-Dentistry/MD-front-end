import { Outlet } from "react-router-dom";
import Header from "./Header";
import SidebarMenu from "../SidebarMenu";
import Breadcrumb from "../Breadcrumb";
import '../../assets/style/layout.css'; // Import your CSS file for layout styles
import '../../assets/style/breadcrumb.css';

// <Header />
//    <SidebarMenu/>
//    <Breadcrumb />
//    <Outlet /> {
const Layout = () => {
  return (
    <div className="flex w-full">
        <div><SidebarMenu/></div>
        <div className="flex flex-col w-full mt-0 m-4">
          <Header/>
          <Breadcrumb/>
          <Outlet/>
        </div>
    </div>
  );
};

export default Layout;