import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import ChatDashboard from "./pages/ChatDashboard/ChatDashboard";
import Profile from "./pages/Profile/Profile";
import SignInUp from "./pages/SignInUp/SignInUp";
import Upload from "./pages/Upload/Upload";
import Search from "./pages/Search/Search";
import { useState } from "react";
import {
  TokenDataContext,
  UserDataContext,
} from "./components/context/Context";
import Layout from "./components/Layout/Layout";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <TokenDataContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chatDashboard" element={<ChatDashboard />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/signinup" element={<SignInUp />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TokenDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
