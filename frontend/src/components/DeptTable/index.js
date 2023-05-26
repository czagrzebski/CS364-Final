import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Toolbar, Typography, TablePagination } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateDepartmentDialog from "../CreateDepartmentDialog";

export default function DeptTable({ deptList, onUpdate }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      deptList.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage, deptList],
  );


  return (
    <div>
      <EnhancedToolBar />
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
                <TableCell>Department</TableCell>
                <TableCell align="right">Department Id</TableCell>
                <TableCell align="right">Number of Members</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No departments found
                  </TableCell>
                </TableRow>
              )}
              {visibleRows.map((dept) => (
                <TableRow
                  key={dept.DeptId}
                  hover
                >
                  <TableCell padding="checkbox"> </TableCell>
                  <TableCell component="th" scope="row">
                    {dept.DeptName}
                  </TableCell>
                  <TableCell align="right">{dept.DeptId}</TableCell>
                  <TableCell align="right">{dept.NumMembers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={deptList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      {isCreateDialogOpen ? (
        <CreateDepartmentDialog
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
          onUpdate={onUpdate}
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
        pr: { xs: 1, sm: 1 },
        backgroundColor: "#1E1E1E"
      }}
    >
      <Typography
        sx={{ flex: '1 1 80%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Department List
      </Typography>
    </Toolbar>
  );
}