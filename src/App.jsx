import { useEffect } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
//Pages
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
//Firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
//redux
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./actions/userAction";

function App() {
  const { user } = useSelector(data => data.user);
  // console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        //Logged
        // console.log(userCredential);
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
      <Routes>
        {!user
          ? (<Route path="/" element={<Login />} />)
          : (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<HomeScreen />} />
            </>
          )}
      </Routes>
    </div>
  );
}

export default App;
