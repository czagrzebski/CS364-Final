import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../../services/api";
import { useNotification } from "../NotificationProvider";

export default function EditProjectDialog({
  isDialogOpen,
  setIsDialogOpen,
  onUpdate,
  project,
}) {
  const [projectTitle, setProjectTitle] = useState(project.ProjectTitle);
  const [projectDepartment, setProjectDepartment] = useState(project.DeptId);
  const [isProjectActive, setIsProjectActive] = useState(project.ProjectActive);
  const [departmentList, setDepartmentList] = useState([]);

  const { createNotification } = useNotification();

  useEffect(() => {
    getAllDepartments();
  }, [project]);

  const handleClose = () => {
    setIsDialogOpen(false);
    setProjectTitle("");
    setProjectDepartment(-1);
    setDepartmentList([]);
  };

  const getAllDepartments = () => {
    api
      .get("/department/all")
      .then((response) => {
        setDepartmentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProject = () => {
    api
      .put("/project/update", {
        ProjectId: project.ProjectId,
        ProjectTitle: projectTitle,
        DeptId: projectDepartment,
        ProjectActive: isProjectActive,
      })
      .then((response) => {
        createNotification("Project updated successfully!", "success");
        onUpdate();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        createNotification("Error updating project!", "error");
      });
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Title"
            value={projectTitle}
            color="info"
            onChange={(event) => setProjectTitle(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="project-select-label" color="info">
            Department
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectDepartment}
            label="Project"
            color="info"
            required
            onChange={(event) => setProjectDepartment(event.target.value)}
          >
            {departmentList.map((department) => {
              return (
                <MenuItem
                  color="info"
                  key={department.DeptId}
                  value={department.DeptId}
                >
                  {department.DeptName}
                </MenuItem>
              );
            })}
          </Select>
          <FormControlLabel sx={{marginTop: "10px"}} control={<Checkbox checked={isProjectActive} onChange={(event) => setIsProjectActive(event.target.checked)} color="info"/>} label="Active" color="info" />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="info" onClick={updateProject}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
