import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";

const FormForAddEdit = ({textFieldValues, onChangeTextField, onClickAddElement}) => (
    <Paper sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row",position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(0,0,0, 0.25)' }} elevation={3}>
        <TextField
            sx={{ width: '100%'}}
            id="filled-basic"
            label="Dessert"
            value={textFieldValues.Dessert}
            onChange={onChangeTextField}
            name="Dessert"
            variant="filled"
            required
        />
        <TextField
            sx={{ width: '100%'}}
            id="filled-basic"
            label="Calories"
            value={textFieldValues.Calories}
            onChange={onChangeTextField}
            name="Calories"
            variant="filled"
            type="number"
            required
        />
        <TextField
            sx={{ width: '100%'}}
            id="filled-basic"
            label="Fat"
            value={textFieldValues.Fat}
            onChange={onChangeTextField}
            name="Fat"
            variant="filled"
            type="number"
            required
        />
        <TextField
            sx={{ width: '100%'}}
            id="filled-basic"
            label="Carbs"
            value={textFieldValues.Carbs}
            onChange={onChangeTextField}
            name="Carbs"
            variant="filled"
            type="number"
            required
        />
        <TextField
            sx={{ width: '100%'}}
            id="filled-basic"
            label="Protein"
            value={textFieldValues.Protein}
            onChange={onChangeTextField}
            name="Protein"
            variant="filled"
            type="number"
            required
        />
        <Button sx={{ width: '100%'}} onClick={onClickAddElement} variant="contained" disableElevation endIcon={<SendIcon />}>
            SEND
        </Button>
    </Paper>
)

export default FormForAddEdit