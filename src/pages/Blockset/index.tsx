import React from "react";
import { Route, Routes } from "react-router";
import CreateUserBlockset from "./CreateUserBlockset";
import CreateAdminBlockset from "./CreateAdminBlockset";
import ReadBlocksetInfo from "./ReadBlocksetInfo";
import ReadDataBlock from "./ReadDataBlock";

const Blockset: React.FC = () => {
  return (
    <Routes>
      <Route path="create/user" element={<CreateUserBlockset />} />
      <Route path="create/admin" element={<CreateAdminBlockset />} />
      <Route path="read/blockset-info" element={<ReadBlocksetInfo />} />
      <Route path="read/data-block" element={<ReadDataBlock />} />
    </Routes>
  );
};

export default Blockset;
