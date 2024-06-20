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
import HashtagPosts from "./pages/HashtagPosts/HashtagPosts";
import AuthRequired from "./components/Authrequired";
import SinglePost from "./pages/SinglePost/SinglePost";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <TokenDataContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthRequired>
                    <Home />
                  </AuthRequired>
                }
              />
              <Route
                path="/chat"
                element={
                  <AuthRequired>
                    <Chat />
                  </AuthRequired>
                }
              />
              <Route
                path="/chatDashboard"
                element={
                  <AuthRequired>
                    <ChatDashboard />
                  </AuthRequired>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <AuthRequired>
                    <Profile />
                  </AuthRequired>
                }
              />
              <Route path="/signinup" element={<SignInUp />} />
              <Route
                path="/upload"
                element={
                  <AuthRequired>
                    <Upload />
                  </AuthRequired>
                }
              />
              <Route
                path="/search"
                element={
                  <AuthRequired>
                    <Search />
                  </AuthRequired>
                }
              />
              <Route
                path="/hashtagposts/:hashtag"
                element={
                  <AuthRequired>
                    <HashtagPosts />
                  </AuthRequired>
                }
              />

              <Route
                path="/singlepost/:postId"
                element={
                  <AuthRequired>
                    <SinglePost />
                  </AuthRequired>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TokenDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
