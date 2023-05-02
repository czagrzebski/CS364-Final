import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Divider, Box } from "@mui/material";
import { Grid, MenuItem, Menu, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useUserStore from "../../utils/Stores";
import authService from "../../services/auth.service";

const drawerWidth = 240;

export default function AppBarCustom({ pageTitle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const username = useUserStore((state) => state.FullName)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'primary.main' }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>

          <Grid container alignItems="center" justifyContent="flex-end" marginLeft="auto" maxWidth="200px">
            <IconButton
              aria-label="account"
              size="large"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuClick}
            >
              <AccountCircle />
            </IconButton>

            {username}

          </Grid>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => {
              handleClose()
              authService.logout();
            }}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <Divider />
      </AppBar>
    </Box>
  );
}