import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import EnhancedTableToolbar from "./EnhancedTableToolbar/EnhancedTableToolbar"
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead"
import Alerts from "./Alerts/Alerts";
import FormForAddEdit from "./FormForAddEdit/FormForAddEdit";
import {error, info, success, warning} from "./SeverityLevels/SeverityLevels";
import EnhancedTableBody from "./EnhancedTableBody/EnhancedTableBody";

function createData(name, id, type, count, description) {
    return {
        name,
        id,
        type,
        count,
        description,
    };
}

export default function EnhancedTable(props) {
    
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [textFieldValues, setTextFieldValues] = React.useState(
        {
            name: '',
            id: '',
            type: '',
            count: '',
            description: ''
        }
    );
    const validation = (data) => {
        return data.name === '' ||
            data.id === '' ||
            data.type === '' ||
            data.count === '' ||
            data.description === '';
    }

    
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState({
        level: info,
        message: 'This is a table that you can edit',
    })
    
    // A variable to find out if there is an element in rows
    let isElementLocatedInRows = undefined
    
    const [isEditing, setIsEditing] = React.useState(false); // check: is editing taking place
    const [indexItem, setIndexItem] = React.useState(0);     // index for editing
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        
        setSelected(newSelected);
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const isSelected = (name) => selected.indexOf(name) !== -1;
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;
    
    const cleanTextFieldValues = (setTextFieldValues) => {
        setTextFieldValues({
            name: '',
            id: '',
            type: '',
            count: '',
            description: ''
        })
    }
    
    const validateTextFields = () => {
        setAlert({
            level: error,
            message: 'Error! Fill in all required fields.'
        })
    }
    
    const editElementFunction = (data) => {
        console.log(">>>>> editElementFunction", data);

        props.setData((prev) => {
            prev[indexItem] = createData(
                data.name,
                data.id,
                data.type,
                data.count,
                data.description
            )

            return prev;
        });
        
        setAlert({
            level: info,
            message: 'The element in the table has been changed!'
        })
    
        setIsEditing(false)
        cleanTextFieldValues(setTextFieldValues)
    }
    
    const addElementFunction = (data) => {

        isElementLocatedInRows = false
    
        props.data.map((row, index) => {
            if (row.name === data.name) {
                isElementLocatedInRows = true
            }
            return index
        })
    
        if (!isElementLocatedInRows) {
            props.setData((prev) => {
                prev.push(createData(
                    data.name,
                    data.id,
                    data.type,
                    data.count,
                    data.description
                ))

                return prev;
            });
            setAlert({
                level: success,
                message: 'Element has been added to the table!'
            })
        } else {
            setAlert({
                level: warning,
                message: 'This element is already available in the table!'
            })
        }
        cleanTextFieldValues(setTextFieldValues)
    }
    
    const handleClickButton = (data) => {
        if (validation(data)) {
            validateTextFields()
        } else if (isEditing) {
            editElementFunction(data)
        } else {
            addElementFunction(data)
        }
        setOpen(true)
    }
    
    const handleClickEdit = (item, index) => {
        const {name, id, type, count, description} = item
        console.log(">>>>> ITEM", JSON.stringify(item));
        setTextFieldValues({
            name,
            id,
            type,
            count,
            description
        })
        setSelected([])
        setIndexItem(index)
        setIsEditing(true)
    }
    
    console.log("RENDER")

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 7 }}>
                <EnhancedTableToolbar
                    onClearSelected={() => setSelected([])}
                    numSelected={selected.length}
                    selectedItems={selected}
                    onClickEdit={(item, index) => handleClickEdit(item, index)}
                    data={props.data}
                    setData={props.setData}
                    onEditAlert={() => {
                        setAlert({
                            level: warning,
                            message: 'Warning! Only one element can be edited.'
                        })
                        setOpen(true)
                    }}
                    onDeleteAlert={() => {
                        setAlert({
                            level: warning,
                            message: 'The items was removed from the table.'
                        })
                        setOpen(true)
                    }}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={props.data.length}
                        />
                        <EnhancedTableBody
                            data={props.data}
                            order={order}
                            orderBy={orderBy}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onIsSelected={(name) => isSelected(name)}
                            onHandleClick={(event, name) => handleClick(event, name)}
                            emptyRows={emptyRows}
                        />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Alerts
                level={alert.level}
                message={alert.message}
                open={open}
                setOpen={() => setOpen(false)}
            />
            <FormForAddEdit
                textFieldValues={textFieldValues}
                onClickButton={handleClickButton}
            />
        </Box>
    );
}