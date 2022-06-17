import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";

const FormForAddEdit = ({onClickButton}) => {
    const [textFieldValues, setTextFieldValues] = React.useState(
        {
            Dessert: '',
            Calories: '',
            Fat: '',
            Carbs: '',
            Protein: ''
        }
    );

    const handleChangeTextField = event => {
        setTextFieldValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <Paper sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row",position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(0,0,0, 0.25)' }} elevation={3}>
            {["Dessert", "Calories", "Fat", "Carbs", "Protein"].map((item, index) => (
                <TextField
                    key={index}
                    sx={{ width: '100%'}}
                    id="filled-basic"
                    label={item}
                    value={textFieldValues[item]}
                    onChange={event => handleChangeTextField(event)}
                    name={item}
                    variant="filled"
                    required
                />
            ))}
            <Button sx={{ width: '100%'}} onClick={() => onClickButton(textFieldValues, setTextFieldValues)} variant="contained" disableElevation endIcon={<SendIcon />}>
                SEND
            </Button>
        </Paper>
    )
}

export default FormForAddEdit