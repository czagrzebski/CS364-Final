import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function TaskTable({taskList, addTask, updateTask}) {

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const onItemChecked = (event, task) => {
    console.log(task)
    task.TaskCompleted = !task.TaskCompleted;
    updateTask(task);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'>
              <IconButton onClick={addTask}>
                <AddCircleIcon/>
              </IconButton>
            </TableCell>
            <TableCell>Task</TableCell>
            <TableCell align="right">Project</TableCell>
            <TableCell align="right">Assignee</TableCell>
            <TableCell align="right">Due Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskList.length === 0 && <TableRow><TableCell colSpan={5} align='center'>No tasks found</TableCell></TableRow>}
          {taskList.map((task) => (
              <TableRow
                key={task.TaskId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
              >
      
              <TableCell padding="checkbox">
                  <IconButton aria-label="delete" onClick={(event) => onItemChecked(event, task)}>
                   {task.TaskCompleted ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
                  </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {task.TaskTitle}
              </TableCell>
              <TableCell align="right">{task.ProjectTitle}</TableCell>
              <TableCell align="right">{task.FirstName} {task.LastName}</TableCell>
              <TableCell align="right" sx={{color: new Date() > new Date(task.TaskDueDate) ? "red" : "white"}}>{formatDate(task.TaskDueDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
