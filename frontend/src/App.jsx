import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import ChatDashboard from "./pages/ChatDashboard/ChatDashboard";
import Profile from "./pages/Profile/Profile";
import SignInUp from "./pages/SignInUp/SignInUp";
import Upload from "./pages/Upload/Upload";
import Search from "./pages/Search/Search";
import { useState, useEffect } from "react";
import {
  TokenDataContext,
  UserDataContext,
  ChatsDataContext,
  ColorModeContext,
} from "./components/context/Context";
import Layout from "./components/Layout/Layout";
import HashtagPosts from "./pages/HashtagPosts/HashtagPosts";
import AuthRequired from "./components/Authrequired";
import SinglePost from "./pages/SinglePost/SinglePost";
import Loading from "./components/Loading/Loading";
import EditPost from "./pages/EditPost/EditPost";
import SavedPosts from "./pages/SavedPosts/SavedPosts";
import LikedPosts from "./pages/LikedPosts/LikedPosts";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [colorSelect, setColorSelect] = useState();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <ColorModeContext.Provider value={{ colorSelect, setColorSelect }}>
      <ChatsDataContext.Provider value={{ chats, setChats }}>
        <UserDataContext.Provider value={{ user, setUser }}>
          <TokenDataContext.Provider value={{ token, setToken }}>
            {isLoading ? (
              <Loading />
            ) : (
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
                      path="/chat/:id"
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
                      path="/newChat"
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
                    <Route
                      path="/editpost/:id"
                      element={
                        <AuthRequired>
                          <EditPost />
                        </AuthRequired>
                      }
                    />
                    <Route
                      path="/savedposts"
                      element={
                        <AuthRequired>
                          <SavedPosts />
                        </AuthRequired>
                      }
                    />
                    <Route
                      path="/likedposts"
                      element={
                        <AuthRequired>
                          <LikedPosts />
                        </AuthRequired>
                      }
                    />
                  </Routes>
                </Layout>
              </BrowserRouter>
            )}
          </TokenDataContext.Provider>
        </UserDataContext.Provider>
      </ChatsDataContext.Provider>
    </ColorModeContext.Provider>
  );
}

export default App;
