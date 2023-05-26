import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Toolbar, Typography, Switch, FormControlLabel, FormGroup, MenuItem, Menu, Tooltip, TablePagination, CircularProgress } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from '@mui/icons-material/FilterList';
import EditTaskDialog from "../EditTaskDialog";
import api from "../../services/api";
import CreateTaskDialog from "../CreateTaskDialog";

export default function TaskTable({
  taskList,
  onUpdate,
  hideCompleted,
  setHideCompleted,
  showAllTasks,
  setShowAllTasks,
  loading
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const onTaskChecked = (event, task) => {
    event.stopPropagation();
    task.TaskCompleted = !task.TaskCompleted;
    updateTask(task);
  };

  const onEditTask = (event, user) => {
    event.stopPropagation();
    setSelectedTask(user);
    setIsEditDialogOpen(true);
  };

  const updateTask = (task) => {
    api.put('/task/update', {
      TaskId: task.TaskId,
      TaskTitle: task.TaskTitle,
      TaskDescription: task.TaskDescription,
      TaskCompleted: task.TaskCompleted,
      TaskDateAssigned: task.TaskDateAssigned,
      TaskDueDate: task.TaskDueDate,
      ProjectId: task.ProjectId,
      UserId: task.UserId,
    }).then((response) => {
      onUpdate();
    });
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
      taskList.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage, taskList],
  );

  return (
    loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    ) : (
      <div>
        <EnhancedTaskToolBar isChecked={hideCompleted} setIsChecked={setHideCompleted} showAllTasks={showAllTasks} setShowAllTasks={setShowAllTasks} />
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
                  <TableCell>Task</TableCell>
                  <TableCell align="right">Project</TableCell>
                  <TableCell align="right">Assignee</TableCell>
                  <TableCell align="right">Date Assigned</TableCell>
                  <TableCell align="right">Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No tasks found
                    </TableCell>
                  </TableRow>
                )}
                {visibleRows.map((task) => (
                  (hideCompleted && task.TaskCompleted) ? null : (
                    <TableRow
                      key={task.TaskId}
                      onClick={(event) => onEditTask(event, task)}
                      hover
                    >
                      <TableCell padding="checkbox">
                        <IconButton
                          aria-label="delete"
                          onClick={(event) => onTaskChecked(event, task)}
                        >
                          {task.TaskCompleted ? (
                            <TaskAltIcon />
                          ) : (
                            <RadioButtonUncheckedIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <Tooltip
                        title={task.TaskDescription}
                        placement="bottom-start"
                        arrow
                      >
                        <TableCell component="th" scope="row">
                          {task.TaskTitle}
                        </TableCell>
                      </Tooltip>
                      <TableCell align="right">{task.ProjectTitle}</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            task.UserId ? "white" : "red",
                        }}>
                        {task.UserId ? task.FirstName + " " + task.LastName : "Unassigned"}
                      </TableCell>
                      <TableCell align="right">{task.DateAssigned}</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            new Date() > new Date(task.TaskDueDate) ? "red" : "white",
                        }}
                      >
                        {formatDate(task.TaskDueDate)}
                      </TableCell>
                    </TableRow>
                  )

                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={taskList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {isEditDialogOpen ? (
          <EditTaskDialog
            isDialogOpen={isEditDialogOpen}
            setIsDialogOpen={setIsEditDialogOpen}
            onUpdate={onUpdate}
            task={selectedTask}
          />
        ) : null}
        {isCreateDialogOpen ? (
          <CreateTaskDialog
            isDialogOpen={isCreateDialogOpen}
            setIsDialogOpen={setIsCreateDialogOpen}
            onUpdate={onUpdate}
          />
        ) : null}
      </div>
    )
  )
}

function EnhancedTaskToolBar({ isChecked, setIsChecked, showAllTasks, setShowAllTasks }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 3 },
        pr: { xs: 1, sm: 2 },
        backgroundColor: "#1E1E1E"
      }}
    >
      <Typography
        sx={{ flex: '1 1 80%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Task List
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
          <FormGroup>
            <FormControlLabel control={<Switch checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} color="info" />} label="Show/Hide Completed Tasks" labelPlacement="end" />
          </FormGroup>
        </MenuItem>
        <MenuItem>
          <FormGroup>
            <FormControlLabel control={<Switch checked={showAllTasks} onChange={(event) => setShowAllTasks(event.target.checked)} color="info" />} label="Show All User Tasks" labelPlacement="end" />
          </FormGroup>
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}

