import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TasksIcon from '@mui/icons-material/Task';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const drawerWidth = 240;

export default function NavDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'primary.main' }}
        elevation={0}

      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Title
          </Typography>
        </Toolbar>
        <Divider />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
            <TaskAltIcon sx={{marginRight: '5px'}}/>
            <Typography variant="h6">Taskify</Typography>
        </Toolbar>
        <Divider />
        <List>
            <Link to="/tasks">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <TasksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/projects">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
        <Toolbar />
        </Drawer>
    </Box>
  );
}