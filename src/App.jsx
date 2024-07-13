import HomeScreen from "./pages/HomeScreen/HomeScreen";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
