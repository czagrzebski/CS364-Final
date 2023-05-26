import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Toolbar, TablePagination, TextField, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateUserDialog from "../CreateUserDialog";
import EditUserDialog from "../EditUserDialog";

export default function TaskTable({ userList, onUpdate, searchTerm, setSearchTerm }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const onEditUserSelected = (event, user) => {
    event.stopPropagation();
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      userList.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage, userList],
  );

  return (
    <div>
      <EnhancedToolBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
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
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
              {visibleRows.map((user) => (
                <TableRow
                  key={user.UserId}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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


function EnhancedToolBar({ searchTerm, setSearchTerm }) {
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

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Search"
          variant="outlined"
          color="info"
          onChange={
            (event) => {
              setSearchTerm(event.target.value);
            }
          } />
      </Box>
    </Toolbar>
  );
}