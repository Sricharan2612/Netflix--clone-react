import { useEffect, useState } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
//Pages and Components
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import LandingPage from "./pages/LandingPage/LandingPage";
import Profile from "./pages/Profile/Profile";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Loader from "./components/Loader/Loader";
//Firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
//redux
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./actions/userAction";
import axios from "./axios";


function App() {
  const locationUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  const [loader, setLoader] = useState(false);
  //Request Interceptor
  axios.interceptors.request.use((config) => {
    setLoader(true);
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  //Response Interceptor
  axios.interceptors.response.use((config) => {
    setLoader(false);
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const { user } = useSelector(data => data.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        //Logged
        dispatch(login({
          uid: userCredential.uid,
          email: userCredential.email
        }));
      } else {
        // loggedOut
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {loader && (<Loader />)}
      <Routes>
        {!user ? <Route path="/" element={<LandingPage />} /> : <Route path="/homepage" element={<HomeScreen />} />}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
