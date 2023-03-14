import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });

  localStorage.setItem('isAuth',"false");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login userDetails={userDetails} setUserDetails={setUserDetails} />} />
          <Route exact path="/register" element={ <Register />} />
          <Route exact path="/" element={<Home userDetails={userDetails}/>} />
          <Route exact path="*" element={<h1>Invalid Url Please Login </h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
