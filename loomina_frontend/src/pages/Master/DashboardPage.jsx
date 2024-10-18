import React from "react";
import MasterPage from "../../components/master/Master";
import CreateSpark from "../../components/create/CreateSpark";
import Dashboard from "../Dashboard/Dashboard";
import CreateButton from "../../components/modals/createButton";
import '../../css/dashboard/main.css';

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
