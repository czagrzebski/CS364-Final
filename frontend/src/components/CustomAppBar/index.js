import { AppBar, Toolbar, Typography, Divider } from "@mui/material";

const drawerWidth = 240;

export default function AppBarCustom({pageTitle, controlPanel}) {
    return (
        <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'primary.main' }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
        </Toolbar>
        <Divider />
      </AppBar>
    );
}