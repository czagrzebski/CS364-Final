import { useState } from "react";
import {
  TextField,
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import api from "../../services/api";
import { useNotification } from "../NotificationProvider";

export default function CreateDepartmentDialog({
  isDialogOpen,
  setIsDialogOpen,
  onUpdate,
}) {
  const [departmentName, setDepartmentName] = useState("");

  const { createNotification } = useNotification();

  const handleClose = () => {
    setIsDialogOpen(false);
    setDepartmentName("");
  };

  const createProject = () => {
    api
      .post("/department/create", {
        DeptName: departmentName,
      })
      .then((response) => {
        createNotification("Department created successfully!", "success");
        onUpdate();
        handleClose();
      })
      .catch((error) => {
        createNotification("Error creating department!", "error");
        console.log(error);
      });
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Create Department</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue=""
            color="info"
            onChange={(event) => setDepartmentName(event.target.value)}
          />
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
