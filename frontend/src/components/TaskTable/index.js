import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditTaskDialog from "../EditTaskDialog";
import { Tooltip, Toolbar, Typography } from "@mui/material";
import api from "../../services/api";
import CreateTaskDialog from "../CreateTaskDialog";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FilterListIcon from '@mui/icons-material/FilterList';

export default function TaskTable({
  taskList,
  onUpdate,
  hideCompleted,
  setHideCompleted,
  showAllTasks,
  setShowAllTasks
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState({});

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

  return (
    <div>
      <EnhancedTaskToolBar isChecked={hideCompleted} setIsChecked={setHideCompleted} showAllTasks={showAllTasks} setShowAllTasks={setShowAllTasks} />
      <TableContainer component={Paper}>
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
            {taskList.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No tasks found
                </TableCell>
              </TableRow>
            )}
            {taskList.map((task) => (
              (hideCompleted && task.TaskCompleted) ? null : (
                <TableRow
                key={task.TaskId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
  );
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

