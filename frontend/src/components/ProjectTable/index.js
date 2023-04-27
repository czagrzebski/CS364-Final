import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateProjectDialog from "../CreateProjectDialog";
import EditProjectDialog from "../EditProjectDialog";

export default function ProjectTable({
  projectList,
  onUpdate,
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const onEditProjectSelected = (event, project) => {
    event.stopPropagation();
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <IconButton onClick={() => setIsCreateDialogOpen(true)}>
                  <AddCircleIcon />
                </IconButton>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No projects found
                </TableCell>
              </TableRow>
            )}
            {projectList.map((project) => (
              <TableRow
                key={project.ProjectId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(event) => onEditProjectSelected(event, project)}
                hover
              >
                <TableCell padding="checkbox"> </TableCell>
                <TableCell component="th" scope="row">
                  {project.ProjectTitle}
                </TableCell>
                <TableCell align="right">{project.DeptName}</TableCell>
                <TableCell align="right">
                  {project.ProjectActive ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isCreateDialogOpen ? (
        <CreateProjectDialog
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
          onUpdate={onUpdate}
        />
      ) : null}
      {isEditDialogOpen ? (
        <EditProjectDialog
          isDialogOpen={isEditDialogOpen}
          setIsDialogOpen={setIsEditDialogOpen}
          onUpdate={onUpdate}
          project={selectedProject}
        />
      ) : null}
    </div>
  );
}
