import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  TextField,
  FormControl,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
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
