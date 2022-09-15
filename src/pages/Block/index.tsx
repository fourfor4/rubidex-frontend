import React from "react";
import { Route, Routes } from "react-router";
import InsertData from "./InsertData";
import SelectBlock from "./SelectBlock";
import WriteBlock from "./WriteBlock";

const Block: React.FC = () => {
  return (
    <Routes>
      <Route path="select" element={<SelectBlock />} />
      <Route path="write" element={<WriteBlock />} />
      <Route path="insertdata" element={<InsertData />} />
    </Routes>
  );
};

export default Block;
