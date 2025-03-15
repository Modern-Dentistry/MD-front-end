// Components
import Sidebar from "../components/Sidebar";
import Header from "../components/layout/Header";
import UserList from "../components/UserList";

// Style
import "../assets/style/home.css";

function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="home-container">
        <UserList />
      </div>
    </>
  );
}

export default Home;
