import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import DeptTable from "../../components/DeptTable";
import api from "../../services/api";

export function Departments() {
  const [deptList, setDeptList] = useState([]);

  useEffect(() => {
    getAllDepartments();
  }, []);

  const getAllDepartments = () => {
    api.get("/department/all")
      .then((response) => {
        setDeptList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <CustomAppBar pageTitle="Departments" />
      <DeptTable 
        deptList={deptList} 
        onUpdate={getAllDepartments}
        />
    </div>
  );
}
