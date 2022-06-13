import React, {useEffect} from 'react'
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

// Element has been added to the table! | success
// This element is already available in the table! | warning
// Error! Fill in all required fields. | error
// The element in the table has been changed! | info
// Warning! Only one element can be edited. | warning

const Alerts = ({ level, message, open, setOpen })  => {
    useEffect(() => {
        const timeId = setTimeout(() => {
            setOpen()
        }, 3000)
        
        return () => {
            clearTimeout(timeId)
        }
    });
    
    return (
        <Paper sx={{position: 'fixed', right: 0, bottom: 70}}>
            <Collapse in={open}>
                <Alert variant="outlined" severity={level} onClose={setOpen}>
                    {message}
                </Alert>
            </Collapse>
        </Paper>
    )
}



export default Alerts