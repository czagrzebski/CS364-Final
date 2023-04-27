import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import api from "../../services/api";
import ProjectTable from "../../components/ProjectTable";

export function Projects() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = () => {
    api
      .get("project/all")
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
      />
    </div>
  );
}
