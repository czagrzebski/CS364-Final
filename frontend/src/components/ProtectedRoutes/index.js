import React from "react";
import useUserStore from "../../utils/Stores";
import { CircularProgress, Box } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const auth = useUserStore((state) => state.AccessToken)
    const loading = useUserStore((state) => state.loading)

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
                <CircularProgress color="info" />
            </Box>
        )
    }

    return (auth ? <Outlet /> : <Navigate to="/login" />);
}

export default ProtectedRoutes;