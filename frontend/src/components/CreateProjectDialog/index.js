import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import api from "../../services/api";
import { useNotification } from "../NotificationProvider";

export default function CreateProjectDialog({
  isDialogOpen,
  setIsDialogOpen,
  onUpdate,
}) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDepartment, setProjectDepartment] = useState(-1);
  const [departmentList, setDepartmentList] = useState([]);

  const { createNotification } = useNotification();

  useEffect(() => {
    if (!isDialogOpen) {
      return;
    }

    getAllDepartments();
  }, [isDialogOpen]);

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

  const createProject = () => {
    api
      .post("/project/create", {
        ProjectTitle: projectTitle,
        DeptId: projectDepartment,
      })
      .then((response) => {
        createNotification("Project Successfully Created", "success");
        onUpdate();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        createNotification("Error Creating Project", "error");
      });
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue=""
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
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="info" onClick={createProject}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
