import { useSelector } from "react-redux";
import { Box, Divider, Drawer, List, Toolbar, Tooltip, Typography } from "@mui/material"
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 300 }) => {

    const { displayName, photoURL, email } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );

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
                    notes.map( note => (
                        <SideBarItem key={note.id} note={note} />
                    ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
