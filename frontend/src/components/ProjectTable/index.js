import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Toolbar, Typography, FormControl, Select, InputLabel, MenuItem, Menu, TablePagination } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateProjectDialog from "../CreateProjectDialog";
import EditProjectDialog from "../EditProjectDialog";
import FilterListIcon from '@mui/icons-material/FilterList';
import api from "../../services/api";

export default function ProjectTable({
  projectList,
  onUpdate,
  setSelectedDepartment,
  selectedDepartment
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const onEditProjectSelected = (event, project) => {
    event.stopPropagation();
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      projectList.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage, projectList],
  );

  return (
    <div>
      <EnhancedProjectToolBar setSelectedDepartment={setSelectedDepartment} selectedDepartment={selectedDepartment} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
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
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No projects found
                  </TableCell>
                </TableRow>
              )}
              {visibleRows.map((project) => (
                <TableRow
                  key={project.ProjectId}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projectList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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

function EnhancedProjectToolBar({ setSelectedDepartment, selectedDepartment }) {
  const [deptList, setDeptList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  const getDepartmentList = () => {
    api.get('department/all')
      .then((response) => {
        setDeptList(response.data);
      });
  };


  return (
    <Toolbar
      sx={{
        pl: { sm: 3 },
        pr: { xs: 1, sm: 1 },
        backgroundColor: "#1E1E1E"
      }}
    >
      <Typography
        sx={{ flex: '1 1 80%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Project List
      </Typography>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="user-select-label" color="info">Department</InputLabel>
            <Select
              labelId="user-select-id"
              id="user-select"
              value={selectedDepartment}
              label="Assignee"
              color="info"
              required
              onChange={(event) => setSelectedDepartment(event.target.value)}
            >
              <MenuItem color="info" value={-1}>All</MenuItem>
              {deptList.map((dept) => {
                return <MenuItem color="info" key={dept.DeptId} value={dept.DeptId}>{dept.DeptName}</MenuItem>
              })}
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}