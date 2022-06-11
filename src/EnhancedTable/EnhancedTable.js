import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EnhancedTableToolbar from "./EnhancedTableToolbar/EnhancedTableToolbar"
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead"
import Alerts from "./Alerts/Alerts";
import FormForAddEdit from "./FormForAddEdit/FormForAddEdit";

// constants severity levels
const info = 'info'
const warning = 'warning'
const success = 'success'
const error = 'error'

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rowsChange, setRowsChange] = React.useState(false);
    const [textFieldValues, setTextFieldValues] = React.useState(
        {
            Dessert: '',
            Calories: '',
            Fat: '',
            Carbs: '',
            Protein: ''
        }
    );
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState({
        level: '',
        message: '',
    })
    // A variable to find out if there is an element in rows
    let isDessertLocatedInRows = undefined
    // check: is editing taking place
    const [isEditing, setIsEditing] = React.useState(false);
    const [indexItem, setIndexItem] = React.useState(0); // index for editing
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
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
    
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    
    const isSelected = (name) => selected.indexOf(name) !== -1;
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    
    const handleChangeRows = () => {
        setRowsChange(!rowsChange)
        if (selected.length > 0) {
            setSelected(() => selected.splice(0, selected.length))
        }
    }
    
    const handleChangeTextField = event => {
        setTextFieldValues({
            ...textFieldValues,
            [event.target.name]: event.target.value
        })
    }
    
    const cleanTextFieldValues = () => {
        setTextFieldValues({
            Dessert: '',
            Calories: '',
            Fat: '',
            Carbs: '',
            Protein: ''
        })
    }
    
    const handleClickAddElement = () => {
        
        if (textFieldValues.Dessert === '' ||
            textFieldValues.Calories === '' ||
            textFieldValues.Fat === '' ||
            textFieldValues.Carbs === '' ||
            textFieldValues.Protein === '') {
            
            setAlert({
                level: error,
                message: 'Error! Fill in all required fields.'
            })
            
            setOpen(true)
            
            return
        }
        
        if (isEditing) {
            
            rows[indexItem] = createData(
                textFieldValues.Dessert,
                +textFieldValues.Calories,
                +textFieldValues.Fat,
                +textFieldValues.Carbs,
                +textFieldValues.Protein
            )
            setAlert({
                level: info,
                message: 'The element in the table has been changed!'
            })
            
            setIsEditing(false)
            
            // clearing text fields
            cleanTextFieldValues()
            setOpen(true)
    
    
            return
        }
        
        isDessertLocatedInRows = false
        
        rows.map((row, index) => {
            if (row.name === textFieldValues.Dessert) {
                isDessertLocatedInRows = true
            }
            return index
        })
        
        if (!isDessertLocatedInRows) {
            rows.push(createData(
                textFieldValues.Dessert,
                +textFieldValues.Calories,
                +textFieldValues.Fat,
                +textFieldValues.Carbs,
                +textFieldValues.Protein
            ))
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
    
        setOpen(true)
        // clearing text fields
        cleanTextFieldValues()
    }
    
    const handleClickEdit = (item, index) => {
        const {name, calories, fat, carbs, protein} = item
        setIndexItem(index)
        textFieldValues.Dessert = name
        textFieldValues.Calories = calories
        textFieldValues.Fat = fat
        textFieldValues.Carbs = carbs
        textFieldValues.Protein = protein
        handleChangeRows()
        setIsEditing(true)
    }
    
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    onRowsChange={handleChangeRows}
                    numSelected={selected.length}
                    selectedItems={selected}
                    onClickEdit={(item, index) => handleClickEdit(item, index)}
                    rows={rows}
                    onEditAlerts={() => {
                        setAlert({
                            level: warning,
                            message: 'Warning! Only one element can be edited.'
                        })
                        setOpen(true)
                    }}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                sx={{marginBottom: '100px'}}
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            <Alerts
                level={alert.level}
                message={alert.message}
                open={open}
                setOpen={() => setOpen(false)}
            />
            <FormForAddEdit
                textFieldValues={textFieldValues}
                onChangeTextField={event => handleChangeTextField(event)}
                onClickAddElement={handleClickAddElement}
            />
        </Box>
    );
}