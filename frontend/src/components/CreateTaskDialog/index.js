import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Box, Select, MenuItem } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateTaskDialog({isCreateDialogOpen, setIsCreateDialogOpen, onTaskUpdate}) {
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskDueDate, setTaskDueDate] = React.useState('');
  const [taskProject, setTaskProject] = React.useState('');
  const [taskAssignee, setTaskAssignee] = React.useState('');

  const handleClose = () => {
    setIsCreateDialogOpen(false);
  };

  return (
      <Dialog open={isCreateDialogOpen} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          >
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue=""
            color="info"
          />
          <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          color="info"
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={taskProject}
            label="Project"
            onChange={(event) => setTaskProject(event.target.value)}
            color="info"
          >
            <MenuItem value={10}>Project 1</MenuItem>
            <MenuItem value={20}>Project 2</MenuItem>
            <MenuItem value={30}>Project 3</MenuItem>
          </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
  );
}