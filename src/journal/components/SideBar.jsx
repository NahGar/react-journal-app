import { useSelector } from "react-redux";
import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Tooltip, Typography } from "@mui/material"

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName, photoURL, email } = useSelector( state => state.auth );

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >

            <Drawer
                variant="permanent"
                open={ true }
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Tooltip title={ email }>
                        <Typography variant="h6" noWrap component='div' sx={{ marginRight:'10px' }}>{ displayName }</Typography>
                    </Tooltip>
                    {
                        photoURL ?
                        <Box component='img' src={ photoURL } referrerPolicy="no-referrer"  
                        sx={{ height: 30, width: 30 }}
                        />
                        : ''
                    }
                    
                </Toolbar>
                <Divider />

                <List>
                    {
                        ['Enero','Febrero','Marzo','Abril'].map( text => (
                            <ListItem key={ text } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={ text } />
                                        <ListItemText secondary={ 'DJIASJSIL JKLASDJAJKSDA JKSHDJKAHD JKDA' } />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
