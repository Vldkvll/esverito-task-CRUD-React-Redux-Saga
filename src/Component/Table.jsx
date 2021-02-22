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
import { v1 } from "uuid";

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
    },
    {
        id: "model",
        label: "Model",
        minWidth: 170,
        align: "right",
    },
    {
        id: "actions",
        label: "Actions",
        minWidth: 170,
        align: "right",
    },
];

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
    tableHead: {
        fontWeight: "700",
    },
});

export default function TableForm() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openPut, setOpenPut] = useState(false);
    const [upgradeCar, setUpgradeCar] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();
    const carsState = useSelector(selectCarsStoreState);

    useEffect(
        (data) => {
            dispatch(actionCreators.fetchCars(data));
        },
        [dispatch]
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = (id) => {
        dispatch(actionCreators.deleteCarSaga(id));
    };
    const handleUpgrade = (row) => {
        setUpgradeCar(row)
        setOpenPut(true);
    };

    const handleChangeModalAdd = () => {
        setOpenAdd((openAdd) => !openAdd);
    };
    const handleChangeModalPut = () => {
        setOpenPut((openAdd) => !openAdd);
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
                    onClick={handleChangeModalAdd}
                >
                    add car
                </StyledButton>
            </div>
            <CastModal
                openAdd={openAdd}
                handleChangeModalAdd={handleChangeModalAdd}
            />

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
                                        className={classes.tableHead}
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
                                            key={v1()}
                                        >
                                            <>
                                                <TableCell
                                                    key={v1()}
                                                    align="left"
                                                >
                                                    {row.brand}
                                                </TableCell>
                                                <TableCell
                                                    key={v1()}
                                                    align={"left"}
                                                >
                                                    {row.carNumber}
                                                </TableCell>
                                                <TableCell
                                                    key={v1()}
                                                    align={"left"}
                                                >
                                                    {row.engineType}
                                                </TableCell>
                                                <TableCell
                                                    key={v1()}
                                                    align={"right"}
                                                >
                                                    {row.model}
                                                </TableCell>

                                                <TableCell
                                                    key={v1()}
                                                    align={"right"}
                                                >
                                                    <EditOutlinedIcon
                                                        onClick={() =>
                                                            handleUpgrade(row)
                                                        }
                                                    />
                                                    {openPut ? (
                                                        <CastModal
                                                            openPut={openPut}
                                                            handleChangeModalPut={
                                                                handleChangeModalPut
                                                            }
                                                            car={upgradeCar}
                                                        />
                                                    ) : (
                                                        void 0
                                                    )}
                                                    &nbsp;&nbsp;&nbsp;
                                                    <DeleteOutlinedIcon
                                                        style={{
                                                            color: red[500],
                                                        }}
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
