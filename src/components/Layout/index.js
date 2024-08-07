/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import "../../base.css";

function Layout() {
  // const authen = useSelector((state) => state.authenReducer);
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
