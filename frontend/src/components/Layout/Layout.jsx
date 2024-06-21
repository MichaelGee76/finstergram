import { useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNav =
    location.pathname === "/signinup" ||
    location.pathname === "/chatDashboard" ||
    location.pathname.startsWith("/chat/");

  return (
    <div>
      {!hideNav && <Nav />}
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
