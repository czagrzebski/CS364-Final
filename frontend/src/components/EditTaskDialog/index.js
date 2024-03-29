import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import api from "../../services/api";
import { useNotification } from "../NotificationProvider";


export default function EditTaskDialog({
  isDialogOpen,
  setIsDialogOpen,
  onUpdate,
  task,
}) {
  const [taskTitle, setTaskTitle] = useState(task.TaskTitle);
  const [taskDescription, setTaskDescription] = useState(task.TaskDescription);
  const [taskDueDate, setTaskDueDate] = useState(new dayjs(task.TaskDueDate));
  const [taskDueDateString, setTaskDueDateString] = useState(task.TaskDueDate);
  const [taskProject, setTaskProject] = useState(task.ProjectId);
  const [taskAssignee, setTaskAssignee] = useState(task.UserId);
  const [taskProjectList, setTaskProjectList] = useState([]);
  const [userList, setUserList] = useState([]);

  const { createNotification } = useNotification();

  useEffect(() => {
    // Get project list for select
    getProjectList();
    getUserList();
  }, [task]);

  const handleClose = () => {
    setIsDialogOpen(false);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskProject("");
    setTaskDueDateString("");
    setTaskAssignee(-1);
  };

  const getProjectList = () => {
    api
      .get("/project/all")
      .then((response) => {
        setTaskProjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserList = () => {
    api
      .get("/user/all")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = () => {
    api
      .put("/task/delete", {
        TaskId: task.TaskId,
      })
      .then((response) => {
        createNotification("Task deleted successfully", "success");
        onUpdate();
        handleClose();
      })
      .catch((error) => {
        createNotification("Error deleting task", "error");
        console.log(error);
      });
  };

  const updateTask = () => {
    api
      .put("/task/update", {
        TaskId: task.TaskId,
        TaskTitle: taskTitle,
        TaskDescription: taskDescription,
        TaskDueDate: taskDueDateString,
        TaskCompleted: task.TaskCompleted,
        ProjectId: taskProject,
        UserId: taskAssignee,
      })
      .then((response) => {
        createNotification("Task updated successfully", "success");
        onUpdate();
        handleClose();
      })
      .catch((error) => {
        createNotification("Error updating task", "error");
        console.log(error);
      });
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Edit Task "{task.TaskTitle}"</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="task-title-input"
            label="Title"
            value={taskTitle}
            color="info"
            onChange={(event) => setTaskTitle(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            id="task-description-input"
            label="Description"
            multiline
            rows={4}
            value={taskDescription}
            color="info"
            onChange={(event) => setTaskDescription(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <DatePicker
            label="Due Date"
            value={taskDueDate}
            onChange={(newValue) => {
              setTaskDueDate(newValue);
              setTaskDueDateString(newValue.format("YYYY-MM-DD"));
            }}
            color="info"
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="user-select-label" color="info">
            Assignee
          </InputLabel>
          <Select
            labelId="task-user-select-id"
            id="user-select"
            value={taskAssignee}
            label="Assignee"
            color="info"
            required
            onChange={(event) => setTaskAssignee(event.target.value)}
          >
            <MenuItem color="info" value={-1}>
              None
            </MenuItem>
            {userList.map((user) => {
              return (
                <MenuItem color="info" key={user.UserId} value={user.UserId}>
                  {user.FirstName + " " + user.LastName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="project-select-label" color="info">
            Project
          </InputLabel>
          <Select
            labelId="task=project-select-label"
            id="demo-simple-select"
            value={taskProject}
            label="Project"
            color="info"
            required
            onChange={(event) => setTaskProject(event.target.value)}
          >
            {taskProjectList.map((project) => {
              return (
                <MenuItem
                  color="info"
                  key={project.ProjectId}
                  value={project.ProjectId}
                >
                  {project.ProjectTitle}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={deleteTask}>
          Delete
        </Button>
        <Button color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="info" onClick={updateTask}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
