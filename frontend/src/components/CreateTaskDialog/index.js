import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
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
          <TextField
            required
            id="outlined-required"
            label="Task Title"
            defaultValue=""
            color="info"
          />
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
  );
}