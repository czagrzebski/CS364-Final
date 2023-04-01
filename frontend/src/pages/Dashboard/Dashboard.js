import React from "react";
import { Outlet } from "react-router-dom";
import NavDrawer from "../../components/NavDrawer";
import { Box } from "@mui/material";

const rootStyle =  {
    display: 'flex'
}  

export function Dashboard() {
  return (
    <Box sx={rootStyle}>
        <NavDrawer />
        <Box component="main" sx={{flexGrow: 1, p: 2, bgcolor: 'background.default'}}>
            <Box sx={theme => theme.mixins.toolbar} />
            <Outlet />
        </Box>
    </Box>
  );
}
