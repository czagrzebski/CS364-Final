import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import api from "../../services/api";
import { useNotification } from "../NotificationProvider";

export default function CreateUserDialog({
  isDialogOpen,
  setIsDialogOpen,
  onUpdate,
  user
}) {
  const [firstName, setFirstName] = useState(user.FirstName);
  const [lastName, setLastName] = useState(user.LastName);
  const [userName, setUserName] = useState(user.Username);
  const [userPassword, setUserPassword] = useState("");
  const [role, setRole] = useState(user.Role);
  const [department, setDepartment] = useState(user.DeptId);
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

 const updateUser = () => {
    api.put('/user/update', {
      UserId: user.UserId,
      FirstName: firstName,
      LastName: lastName,
      Username: userName,
      Password: userPassword,
      Role: role,
      DeptId: department
    }).then((response) => {
      createNotification("User updated successfully", "success");
      onUpdate();
      handleClose();
    }).catch((error) => {
      createNotification("Error updating user", "error");
      console.log(error);
    });
  };

  const deleteUser = () => {
    api.put('/user/delete', {
      UserId: user.UserId,
    }).then((response) => {
      createNotification("User deleted successfully", "success");
      onUpdate();
      handleClose();
    }).catch((error) => {
      createNotification("Error deleting user", "error");
      console.log(error);
    });
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Edit User "{user.Username}"</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Username"
            value={userName}
            color="info"
            onChange={(event) => setUserName(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Password"
            value={userPassword}
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
            value={firstName}
            color="info"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Lastname"
            value={lastName}
            color="info"
            onChange={(event) => setLastName(event.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 475 }}>
          <TextField
            required
            id="outlined-required"
            label="Role"
            value={role}
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
        <Button color="error" onClick={deleteUser}>
          Delete
        </Button>
        <Button color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="info" onClick={updateUser}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
