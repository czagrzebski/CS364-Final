import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Toolbar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateUserDialog from "../CreateUserDialog";
import EditUserDialog from "../EditUserDialog";

export default function TaskTable({ userList, onUpdate }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const onEditUserSelected = (event, user) => {
    event.stopPropagation();
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  return (
    <div>
      <EnhancedToolBar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <IconButton onClick={() => setIsCreateDialogOpen(true)}>
                  <AddCircleIcon />
                </IconButton>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Department</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
            {userList.map((user) => (
              <TableRow
                key={user.UserId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(event) => onEditUserSelected(event, user)}
                hover
              >
                <TableCell padding="checkbox" />
                <TableCell>{user.FirstName + " " + user.LastName}</TableCell>
                <TableCell>{user.Username}</TableCell>
                <TableCell>{user.Role}</TableCell>
                <TableCell align="right">{user.DeptName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isCreateDialogOpen ? (
        <CreateUserDialog
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
          onUpdate={onUpdate}
        />
      ) : null}
      {isEditDialogOpen ? (
        <EditUserDialog
          isDialogOpen={isEditDialogOpen}
          setIsDialogOpen={setIsEditDialogOpen}
          onUpdate={onUpdate}
          user={selectedUser}
        />
      ) : null}
    </div>
  );
}


function EnhancedToolBar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 3 },
        pr: { xs: 1, sm: 2 },
        backgroundColor: "#1E1E1E"
      }}
    >
      <Typography
        sx={{ flex: '1 1 80%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        User List
      </Typography>
    </Toolbar>
  );
}