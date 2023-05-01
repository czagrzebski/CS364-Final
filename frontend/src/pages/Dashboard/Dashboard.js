import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Tasks, Projects, Users, Departments, Metrics } from "../index";
import NavDrawer from "../../components/NavDrawer";
import { Box } from "@mui/material";
import { NotificationProvider } from "../../components/NotificationProvider";

const rootStyle =  {
    display: 'flex'
}  

export function Dashboard() {
  return (
    <NotificationProvider>
      <Box sx={rootStyle}>
          <NavDrawer />
          <Box component="main" sx={{flexGrow: 1, p: 2, bgcolor: 'background.default'}}>
              <Box sx={theme => theme.mixins.toolbar} />
              <Routes>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/users" element={<Users />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/metrics" element={<Metrics />} />
                <Route path="/" element={<Navigate to="/dashboard/tasks" />} />
              </Routes>
          </Box>
      </Box>
    </NotificationProvider>
  );
}
