import React, {useEffect} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";

const FormForAddEdit = (props) => {

    console.log(">>>>> FormForAddEdit", JSON.stringify(props.textFieldValues));

    const {textFieldValues, onClickButton} = props;

    const [fieldData, setFieldData] = React.useState(textFieldValues);

    const onChangeTextField = (event) => {
        setFieldData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const sendData = () => {
        onClickButton(fieldData);
    }

    useEffect(() => {
        setFieldData(props.textFieldValues);
    }, [props.textFieldValues])

    return (
        <Paper sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: "row",
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: '1px solid rgba(0,0,0, 0.25)'
        }} elevation={3}>
            {["name", "id", "type", "count", "description"].map((item, index) => (
                <TextField
                    key={index}
                    sx={{width: '100%'}}
                    id="filled-basic"
                    label={item}
                    value={fieldData?.[item]}
                    onChange={onChangeTextField}
                    name={item}
                    variant="filled"
                    required
                />
            ))}
            <Button sx={{width: '100%'}} onClick={sendData} variant="contained" disableElevation
                    endIcon={<SendIcon/>}>
                SEND
            </Button>
        </Paper>
    )
}

export default FormForAddEdit