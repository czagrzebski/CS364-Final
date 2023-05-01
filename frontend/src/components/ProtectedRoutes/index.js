import React from "react";
import useUserStore from "../../utils/Stores";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const auth = useUserStore((state) => state.AccessToken)
    const loading = useUserStore((state) => state.loading)

    if(loading) return (<div>Loading...</div>)

    return (auth ? <Outlet /> : <Navigate to="/login" />);
}

export default ProtectedRoutes;