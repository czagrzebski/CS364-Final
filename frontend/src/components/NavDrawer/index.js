import * as React from 'react';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import TasksIcon from '@mui/icons-material/Task';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const linkStyles = {
    textDecoration: 'none',
    color: 'white'
}

export default function NavDrawer() {
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
                    <TaskAltIcon sx={{ marginRight: '5px' }} />
                    <Typography variant="h6">Taskify</Typography>
                </Toolbar>
                <Divider />
                <List>
                    <Link to="/dashboard/tasks" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TasksIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tasks" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/dashboard/projects" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Projects" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/dashboard/users" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/dashboard/departments" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Departments" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to="/dashboard/metrics" style={linkStyles}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssessmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Metrics" />
                            </ListItemButton>
                        </ListItem>
                    </Link>


                </List>
                <Toolbar />
            </Drawer>
        </Box>
    );
}