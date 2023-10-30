import { Outlet } from "react-router-dom";
import NavBar from "../features/navBar/NavBar";

function NavLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default NavLayout;
