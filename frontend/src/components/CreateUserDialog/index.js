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
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../../services/api";
import { useNotification } from "../NotificationProvider";

export default function CreateUserDialog({
  isDialogOpen,
  setIsDialogOpen,
  onUpdate,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState(-1);
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
    setFirstName("");
    setLastName("");
    setUserName("");
    setUserPassword("");
    setRole("");
    setDepartment(-1);
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

  const createUser = () => {
    api
      .post("/user/create", {
        FirstName: firstName,
        LastName: lastName,
        Username: userName,
        Password: userPassword,
        Role: role,
        DeptId: department,
      })
      .then((response) => {
        createNotification("User created successfully", "success");
        onUpdate();
        handleClose();
      })
      .catch((error) => {
        createNotification("Error creating user", "error");
        console.log(error);
      });
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Username"
            defaultValue=""
            color="info"
            onChange={(event) => setUserName(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Password"
            defaultValue=""
            color="info"
            type="password"
            onChange={(event) => setUserPassword(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Firstname"
            defaultValue=""
            color="info"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Lastname"
            defaultValue=""
            color="info"
            onChange={(event) => setLastName(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Role"
            defaultValue=""
            color="info"
            onChange={(event) => setRole(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="project-select-label" color="info">
            Department
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={department}
            label="Project"
            color="info"
            required
            onChange={(event) => setDepartment(event.target.value)}
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
        <Button color="info" onClick={createUser}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
