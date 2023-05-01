import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import api from "../../services/api";

export function Metrics() {
  return (
    <div>
      <CustomAppBar pageTitle="Metrics" />
      <MostProductiveEmployees />
    </div>
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
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
         Top Performing Employees:
        </Typography>
          {empList.map((emp, index) => (
            <Typography variant="h10" color="text.secondary" display="block">
              {index + 1}: {emp.FirstName} {emp.LastName} 
            </Typography>))}
      </CardContent>
    </Card>
  );
}