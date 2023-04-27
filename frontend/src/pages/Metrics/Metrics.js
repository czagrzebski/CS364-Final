import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function Metrics() {
  return (
    <div>
      <CustomAppBar pageTitle="Metrics" />
      <MostProductiveEmployee />
    </div>
  );
}

function MostProductiveEmployee() {  

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h8" color="text.secondary">
          Most Productive Employee
        </Typography>
      </CardContent>
    </Card>
  );
}