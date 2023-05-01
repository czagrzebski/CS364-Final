import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateDepartmentDialog from "../CreateDepartmentDialog";
import { Toolbar, Typography } from "@mui/material";


export default function DeptTable({ deptList, onUpdate }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
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
              <TableCell>Department</TableCell>
              <TableCell align="right">Department Id</TableCell>
              <TableCell align="right">Number of Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deptList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No departments found
                </TableCell>
              </TableRow>
            )}
            {deptList.map((dept) => (
              <TableRow
                key={dept.DeptId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
      </TableContainer>
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