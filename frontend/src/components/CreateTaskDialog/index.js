import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../../services/api';
import { useNotification } from '../../components/NotificationProvider';

export default function CreateTaskDialog({isCreateDialogOpen, setIsCreateDialogOpen, onTaskUpdate}) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [taskDueDateString, setTaskDueDateString] = useState('');
  const [taskProject, setTaskProject] = useState('');
  const [taskAssignee, setTaskAssignee] = useState(-1);
  const [taskProjectList, setTaskProjectList] = useState([]);
  const [userList, setUserList] = useState([]);

  const { createNotification } = useNotification();

  useEffect(() => {
    // Get project list for select
    getProjectList();

    // Get user list for select
    getUserList();
  }, [])

  const handleClose = () => {
    setIsCreateDialogOpen(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskProject('');
    setTaskDueDateString('')
    setTaskAssignee(-1);
  };

  const getProjectList = () => {
    api.get('project/all')
      .then((response) => {
        setTaskProjectList(response.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  const getUserList = () => {
    api.get('user/all')
      .then((response) => {
        setUserList(response.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  const createTask = () => {
    api.post('task/create', {
      TaskTitle: taskTitle,
      TaskDescription: taskDescription,
      TaskDueDate: taskDueDateString,
      ProjectId: taskProject,
      UserId: taskAssignee
    }).then((response) => {
      createNotification("Task Successfully Created", "success");
      onTaskUpdate();
      handleClose(); 
    }).catch((error) => {
      createNotification("Error Creating Task", "error");
    });
  };

  return (
      <Dialog open={isCreateDialogOpen} onClose={handleClose}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 475 }}>
              <TextField
                required
                id="outlined-required"
                label="Title"
                defaultValue=""
                color="info"
                onChange={(event) => setTaskTitle(event.target.value)}
              />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 475 }}>
              <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              color="info"
              onChange={(event) => setTaskDescription(event.target.value)}
              />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
              <DatePicker
                label="Due Date"
                value={taskDueDate}
                onChange={(newValue) => {
                  setTaskDueDate(newValue)
                  setTaskDueDateString(newValue.format('YYYY-MM-DD'))
                }}
                color="info"
              />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="user-select-label" color="info">Assignee</InputLabel>
              <Select
                labelId="user-select-id"
                id="user-select"
                value={taskAssignee}
                label="Assignee"
                color="info"
                required
                onChange={(event) => setTaskAssignee(event.target.value)}
              >
                <MenuItem color="info" value={-1}>None</MenuItem>
                {userList.map((user) => {
                  return <MenuItem color="info" key={user.UserId} value={user.UserId}>{user.FirstName + " " + user.LastName}</MenuItem>
                })}
              </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="project-select-label" color="info">Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={taskProject}
                label="Project"
                color="info"
                required
                onChange={(event) => setTaskProject(event.target.value)}
              >
                {taskProjectList.map((project) => {
                  return <MenuItem color="info" key={project.ProjectId} value={project.ProjectId}>{project.ProjectTitle}</MenuItem>
                })}
              </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={createTask}>Create</Button>
        </DialogActions>
      </Dialog>
  );
}