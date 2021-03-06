import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import PropTypes from "prop-types";

const EnhancedTableToolbar = (props) => {
    const { numSelected, selectedItems, data, setData, onEditAlert, onDeleteAlert, onClearSelected, onClickEdit} = props;
    
    const handleEditItem = () => {
        if (numSelected > 1) {
            onEditAlert()
            return
        }
        
        let editItem = null
        let indexItem = null
        
        data.map((row, index) => {
            if (row.name === selectedItems[0]) {
                editItem = data[index]
                indexItem = index
            }
            return index
        })
        
        onClickEdit(editItem, indexItem)
    }
    
    const handleDeleteItems = () => {
        
        for (let value of selectedItems) {
            data.map((row, index) => {
                if (row.name === value) {
                    // rows.splice(index, 1)
                    setData((prev) => {
                        prev.splice(index, 1)
                        return prev;
                    });
                }
                return index
            })
        }
        onDeleteAlert()
        onClearSelected()
    };
    
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {data.length !== 0 ? data[0].type : "table"}
                </Typography>
            )}
            
            {numSelected > 0 ? (
                <>
                    <Tooltip title="Edit">
                        <IconButton onClick={handleEditItem}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDeleteItems} >
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar