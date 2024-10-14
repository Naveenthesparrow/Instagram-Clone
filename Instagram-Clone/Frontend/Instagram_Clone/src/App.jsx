import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Pages/Signup";
import SignIn from "./Pages/Signin";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import AppLayout from "./Pages/AppLayout";
import MyFollowingPost from "./Pages/MyFollowingPost";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CompleteProfile from "./Components/GoogleLogin/CompleteProfile";

function RoutesComponent() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <AppLayout /> : <Navigate to="/signin" />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/following" element={<MyFollowingPost />} />
          </Route>
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
          />
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="962302657851-dvvv6hv67obpm1htv5085tatk5su8bnd.apps.googleusercontent.com">
        <RoutesComponent></RoutesComponent>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
