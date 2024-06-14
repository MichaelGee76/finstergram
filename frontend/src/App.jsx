import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import ChatDashboard from "./pages/ChatDashboard/ChatDashboard";
import Profile from "./pages/Profile/Profile";
import SignInUp from "./pages/SignInUp/SignInUp";
import Upload from "./pages/Upload/Upload";
import Search from "./pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatDashboard" element={<ChatDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signinup" element={<SignInUp />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
