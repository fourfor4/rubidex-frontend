import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Blockset from "../Blockset";
import User from "../User";
import { authState } from "../../redux/selectors";
import Block from "../Block";

const DashBoard: React.FC = (props) => {
  const navigate = useNavigate();
  const { isLoggingIn, loggedIn } = useSelector(authState);
  useEffect(() => {
    if (!isLoggingIn && !loggedIn) {
      navigate("/login");
    }
  }, [isLoggingIn, loggedIn]);
  return (
    <DashboardLayout>
      <Routes>
        <Route path="blockset/*" element={<Blockset />} />
        <Route path="block/*" element={<Block />} />
        <Route path="user/*" element={<User />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashBoard;
