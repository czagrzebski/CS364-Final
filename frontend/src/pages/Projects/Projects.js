import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import api from "../../services/api";
import ProjectTable from "../../components/ProjectTable";

export function Projects() {
  const [projectList, setProjectList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(-1);

  useEffect(() => {
    getAllProjects();

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment]);

  const getAllProjects = () => {
    api
      .get("/project/all", {
        params: {
          DeptId: selectedDepartment
        }
      })
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <CustomAppBar pageTitle="Projects" />
      <ProjectTable
        projectList={projectList}
        getAllProjects={getAllProjects}
        onUpdate={getAllProjects}
        setSelectedDepartment={setSelectedDepartment}
        selectedDepartment={selectedDepartment}
      />
    </div>
  );
}
