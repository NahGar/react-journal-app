import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ note }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return note.title.length > 17 ? note.title.substring(0,17) + '...' : note.title;
    }, [note.title]);

    const onClickNote = ( ) => {

        dispatch( setActiveNote( note ) );
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onClickNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <Tooltip title={note.title} >
                        <ListItemText primary={ newTitle } />
                    </Tooltip>
                    <ListItemText secondary={ note.body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
