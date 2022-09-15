import React from "react";
import { Route, Routes } from "react-router";
import ReadBlock from "./ReadUserBlock";

const User: React.FC = () => {
  return (
    <Routes>
      <Route path="readblock" element={<ReadBlock />} />
    </Routes>
  );
};

export default User;
