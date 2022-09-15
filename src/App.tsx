import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";

import { checkLoggedIn } from "./redux/actions";
import { AppDispatch } from "./interfaces";

import "./App.css";
import "antd/dist/antd.min.css";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // dispatch(checkLoggedIn());
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard/*" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
