import React from "react";
import MasterPage from "../../components/master/Master";
import CreateSpark from "../../components/create/CreateSpark";
import Dashboard from "../Main/Dashboard";
import CreateButton from "../../components/modals/createButton";
import '../../css/main/main.css';

const DashboardPage = () => {
  return (
    <MasterPage>
      {/* <CreateSpark /> */}
      <div className="main-area">
        <Dashboard />
      </div>
      <CreateButton></CreateButton>
    </MasterPage>
  );
};

export default DashboardPage;
