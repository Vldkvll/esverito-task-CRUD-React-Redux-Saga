import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/actions/actionCreators";

import CastModal from "../Component/CastModal";

import { selectCarsStoreState } from "../selectors/selectors";

const StyledButton = withStyles({
    root: {
        background: "#22B2BE",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    label: {
        textTransform: "upercase",
    },
})(Button);

const columns = [
    { id: "brand", label: "Brand", minWidth: 170 },
    { id: "carNumber", label: "Car Number", minWidth: 190 },
    {
        id: "engineType",
        label: "Engine Type",
        minWidth: 100,
        align: "left",
        // format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "model",
        label: "Model",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "actions",
        label: "Actions",
        minWidth: 170,
        align: "right",
        // format: (value) => value.toFixed(2),
    },
];

// function createData(brand, carNumber, engineType, model, actions) {
//     return { brand, carNumber, engineType, model, actions };
// }

// const rows = [
//     createData("Nissan", "AA 1111 AA", "Double  Cylinder Engine", "Juke"),
//     createData("China", "CN", 1403500365, 9596961),
//     createData("Italy", "IT", 60483973, 301340),
//     createData("United States", "US", 327167434, 9833520),
//     createData("Canada", "CA", 37602103, 9984670),
//     createData("Australia", "AU", 25475400, 7692024),
//     createData("Germany", "DE", 83019200, 357578),
//     createData("Ireland", "IE", 4857000, 70273),
//     createData("Mexico", "MX", 126577691, 1972550),
//     createData("Japan", "JP", 126317000, 377973),
//     createData("France", "FR", 67022000, 640679),
//     createData("United Kingdom", "GB", 67545757, 242495),
//     createData("Russia", "RU", 146793744, 17098246),
//     createData("Nigeria", "NG", 200962417, 923768),
//     createData("Brazil", "BR", 210147125, 8515767),
// ];

const useStyles = makeStyles({
    root: {
        width: "94%",
        margin: "0 auto",
    },
    container: {
        maxHeight: 440,
    },
    iconos: {
        cursor: "pointer",
    },
    inputMaterial: {
        width: "100%",
    },
});

export default function TableForm() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const dispatch = useDispatch();
    const carsState = useSelector(selectCarsStoreState);

    const typeofCarsState = Array.isArray(carsState)
    console.log("Array.isArrra(carsState)")
    console.log(typeofCarsState)

    useEffect(
        (data) => {
            dispatch(actionCreators.fetchCars(data));
        },
        [dispatch]
    );

    console.log("carsState");
    console.log(carsState);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = (id) => {
        console.log(id)
        dispatch(actionCreators.deleteCar(id));
    };
    

    const handleChangeModal = () => {
        setOpen((open) => !open);
    };

    return (
        <Paper>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "29px 38px 10px 38px",
                }}
            >
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                    CAR LIST
                </span>
                <StyledButton
                    variant="contained"
                    color="success.main"
                    onClick={handleChangeModal}
                >
                    add car
                </StyledButton>
            </div>
                    <CastModal open={open} handleChangeModal={handleChangeModal} />

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carsState
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.carNumber}
                                        >
                                            <>
                                                <TableCell
                                                    key={row.id}
                                                    align="left"
                                                >
                                                    {row.brand}
                                                </TableCell>
                                                <TableCell
                                                    key={row.id}
                                                    align={"left"}
                                                >
                                                    {row.carNumber}
                                                </TableCell>
                                                <TableCell
                                                    key={row.id}
                                                    align={"left"}
                                                >
                                                    {row.engineType}
                                                </TableCell>
                                                <TableCell
                                                    key={row.id}
                                                    align={"right"}
                                                >
                                                    {row.model}
                                                </TableCell>                      

                                                <TableCell
                                                    key={row.id}
                                                    align={"right"}
                                                >
                                                    <EditOutlinedIcon
                                                        // className={
                                                        //     classes.iconos
                                                        // }
                                                        onClick={() =>
                                                            handleDelete(row.id)
                                                        }
                                                    />
                                                    &nbsp;&nbsp;&nbsp;
                                                    <DeleteOutlinedIcon
                                                        style={{
                                                            color: red[500],
                                                        }}
                                                        // className={
                                                        //     classes.iconos
                                                        // }
                                                        onClick={() =>
                                                            handleDelete(row.id)
                                                        }
                                                    />
                                                </TableCell>
                                            </>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count={carsState.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    labelRowsPerPage="Lines on page:"
                />
            </Paper>
        </Paper>
    );
}
