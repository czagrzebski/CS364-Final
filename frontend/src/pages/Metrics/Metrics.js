import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import { MenuItem, FormControl, Select, InputLabel, Grid, Card, CardContent, Typography } from "@mui/material";
import api from "../../services/api";

export function Metrics() {
  return (
    <div>
      <CustomAppBar pageTitle="Metrics" />
      <Grid container spacing={2} columns={{ xs: 4}}>
        <Grid item xs={3}>
          <MostProductiveEmployees />
        </Grid>
        <Grid item xs={3}>
          <MostProductiveEmployeeDepartment />
        </Grid>
        </Grid>
    </div>
  );
}

function MostProductiveEmployeeDepartment() {  

  const [emp, setEmp] = useState(null);
  const [deptList, setDeptList] = useState([]);
  const [selectedDept, setSelectedDept] = useState(-1);

  useEffect(() => {
    getAllDepartments();
  }, [])

  const getAllDepartments = async () => {
    api.get("/department/all").then((response) => {
      setDeptList(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  const getMostProductiveEmployeeByDepartment = async (department) => {
    api.get("/task/most-productive-by-department", {
      params: {
        DeptId: department
      }
    }).then((response) => {
      if(response.data.FirstName) {
        setEmp(response.data);
      } else {
        setEmp(null);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Card sx={{ minWidth: 300, maxWidth: 500, minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
         Top Performing Employees by Department:
        </Typography>
        <Grid container spacing={2} columns={{xs: 4}}>
            <Grid item xs={3}>
            {emp ? <Typography variant="h10" color="text.secondary" display="block">
              The person with the most completed tasks in the selected department is {emp.FirstName} {emp.LastName} with {emp.TasksCompleted} tasks completed.
            </Typography> : <Typography variant="h10" color="text.secondary" display="block">
              No employees completed any tasks in the selected department.
            </Typography>}
            </Grid>
            <Grid item xs={3}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="user-select-label" color="info">Department</InputLabel>
            <Select
              labelId="user-select-id"
              id="user-select"
              value={selectedDept}
              label="Department"
              color="info"
              required
              onChange={(event) => {
                setSelectedDept(event.target.value);
                getMostProductiveEmployeeByDepartment(event.target.value);
              }}
            >
              <MenuItem key={-1} color="info" value={-1}>None</MenuItem>
              {deptList.map((dept) => {
                return <MenuItem color="info" key={dept.DeptId} value={dept.DeptId}>{dept.DeptName}</MenuItem>
              })}
            </Select>
          </FormControl>
          </Grid>
                 
        </Grid>
      </CardContent>
    </Card>
  );
}

function MostProductiveEmployees() {  

  const [empList, setEmpList] = useState([]);

  useEffect(() => {
    getMostProductiveEmployee();
  }, [])

  const getMostProductiveEmployee = async () => {
    api.get("/task/most-productive").then((response) => {
      setEmpList(response.data);
    }).catch((error) => {
      console.log(error);
    }
    );
  };

  return (
    <Card sx={{ minWidth: 300, maxWidth: 500, minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
         Outstanding Employees:
        </Typography>
          {empList.map((emp, index) => (
            <Typography key={index} variant="h10" color="text.secondary" display="block">
              {index + 1}: {emp.FirstName} {emp.LastName} 
            </Typography>))}
      </CardContent>
    </Card>
  );
}