import { useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNav = location.pathname === "/signinup";

  return (
    <div>
      {!hideNav && <Nav />}
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
