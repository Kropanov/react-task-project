import React from 'react'
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

const Alerts = ({ open, setOpen, alerts })  => (
    <>
        { alerts.alertAddSuccess
            ?
            <Paper sx={{position: 'fixed', right: 0, bottom: 70}}>
                <Collapse in={open}>
                    <Alert variant="outlined" severity="success" onClose={setOpen}>
                        Dessert has been added to the table!
                    </Alert>
                </Collapse>
            </Paper>
            :
            null
        }
        { alerts.alertAddWarning
            ?
            <Paper sx={{position: 'fixed', right: 0, bottom: 70}}>
                <Collapse in={open}>
                    <Alert variant="outlined" severity="warning" onClose={setOpen}>
                        This dessert is already available in the table!
                    </Alert>
                </Collapse>
            </Paper>
            :
            null
        }
        { alerts.alertAddError
            ?
            <Paper sx={{position: 'fixed', right: 0, bottom: 70}}>
                <Collapse in={open}>
                    <Alert variant="outlined" severity="error" onClose={() => {setOpen(false);}}>
                        Error! Fill in all required fields.
                    </Alert>
                </Collapse>
            </Paper>
            :
            null
        }
        { alerts.alertEditInfo
            ?
            <Paper sx={{position: 'fixed', right: 0, bottom: 70}}>
                <Collapse in={open}>
                    <Alert variant="outlined" severity="info" onClose={() => {setOpen(false);}}>
                        The dessert in the table has been changed!
                    </Alert>
                </Collapse>
            </Paper>
            :
            null
        }
        { alerts.alertEditWarning
            ?
            <Paper sx={{position: 'fixed', right: 0, bottom: 70}}>
                <Collapse in={open}>
                    <Alert variant="outlined" severity="warning" onClose={() => {setOpen(false);}}>
                        Warning! Only one dessert can be edited.
                    </Alert>
                </Collapse>
            </Paper>
            :
            null
        }
    </>
)

export default Alerts