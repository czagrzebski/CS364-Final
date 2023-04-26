import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditTaskDialog from "../EditTaskDialog";
import { Tooltip } from "@mui/material";

export default function ProjectTable({
  projectList,
  addProject,
  updateProject,
  onProjectUpdate,
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState({});

  const onEditTask = (event, project) => {
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
                <IconButton>
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
                onClick={(event) => onEditTask(event, project)}
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
      {isEditDialogOpen ? (
        <EditTaskDialog
          task={selectedProject}
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          onTaskUpdate={onProjectUpdate}
        />
      ) : null}
    </div>
  );
}
