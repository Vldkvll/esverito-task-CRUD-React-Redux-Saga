import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions/actionCreators";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { v1 } from "uuid";
import checkEngine from "../helper/validate-engine";
import checkCar from "../helper/validate-car";

function getModalStyle() {
    const top = 28;
    const left = 40;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    "& .MuiTextField-root": {
        margin: theme.spacing(2),
        width: "45%",
    },
    paper: {
        position: "absolute",
        width: 600,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    textField: {
        width: "45%",
        padding: "10px",
    },
    form: {
        width: "100%",
        margin: "0",
        display: "flex",
        flexWrap: "wrap",
    },
}));

export default function CastModal({
    openAdd,
    handleChangeModalAdd,
    openPut,
    handleChangeModalPut,
    car,
}) {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const dispatch = useDispatch();
    const [changeBrand, setChangeBrand] = useState(car ? car.brand : "");
    const [changeModel, setChangeModel] = useState(car ? car.model : "");
    const [changeCarNumber, setChangeCarNumber] = useState(
        car ? car.carNumber : ""
    );
    const [changeEngineType, setChangeEngineType] = useState(
        car ? car.engineType : ""
    );

    const handleChangeBrand = (e) => {
        setChangeBrand(e);
    };

    const handleChangeModel = (e) => {
        setChangeModel(e);
    };
    const handleChangeCarNumber = (e) => {
        setChangeCarNumber(e);
    };
    const handleChangeEngineType = (e) => {
        setChangeEngineType(e);
    };
    const handleChangeEngineCheck = (e) => {
        !checkEngine(e) &&
            allertMessage(
                "Please, input valid data: GAS, HYBRID, or FUEL",
                "in Engine Type"
            );
    };

    const allertMessage = (data, input = "") => {
        alert(`${data}  ${input}`);
    };

    const handleSubmit = () => {
        const newCar = {
            brand: changeBrand,
            carNumber: changeCarNumber,
            engineType: changeEngineType,
            id: !car ? v1() : car.id,
            model: changeModel,
        };

        if (!checkCar(newCar) && !checkEngine(newCar.engineType))
            return allertMessage("Please fill in all fields");

        openPut
            ? dispatch(actionCreators.updateCarSaga(newCar))
            : dispatch(actionCreators.createCarSaga(newCar));

        setChangeBrand("");
        setChangeModel("");
        setChangeCarNumber("");
        setChangeEngineType("");

        openPut ? handleChangeModalPut() : handleChangeModalAdd();
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {openPut ? (
                    <h3 style={{ textTransform: "uppercase" }}>
                        EDIT CAR INFORMATION
                    </h3>
                ) : (
                    <h3 style={{ textTransform: "uppercase" }}>
                        ADD A NEW CAR
                    </h3>
                )}
                <div style={{ marginTop: "15px" }}>
                    {openPut ? (
                        <Button>
                            <CloseIcon onClick={handleChangeModalPut} />
                        </Button>
                    ) : (
                        <Button>
                            <CloseIcon onClick={handleChangeModalAdd} />
                        </Button>
                    )}
                </div>
            </div>
            <form
                noValidate
                autoComplete="off"
                required
                className={clsx(classes.margin, classes.form)}
            >
                <TextField
                    name="brand"
                    variant="filled"
                    label={"Brand"}
                    value={changeBrand}
                    onChange={(e) => handleChangeBrand(e.currentTarget.value)}
                    style={{ flexBasis: "45%" }}
                    className={clsx(classes.margin, classes.textField)}
                />
                <br />
                <TextField
                    name="model"
                    label={"Model"}
                    variant="filled"
                    value={changeModel}
                    onChange={(e) => handleChangeModel(e.currentTarget.value)}
                    className={clsx(classes.margin, classes.textField)}
                />
                <br />
                <TextField
                    name="carNumber"
                    label={"Car Number"}
                    variant="filled"
                    value={changeCarNumber}
                    className={clsx(classes.margin, classes.textField)}
                    onChange={(e) =>
                        handleChangeCarNumber(e.currentTarget.value)
                    }
                />
                <br />
                <TextField
                    name="engineType"
                    label={"Engine Type"}
                    variant="filled"
                    value={changeEngineType}
                    onChange={(e) =>
                        handleChangeEngineType(e.currentTarget.value)
                    }
                    onBlur={(e) =>
                        handleChangeEngineCheck(e.currentTarget.value)
                    }
                    className={clsx(classes.margin, classes.textField)}
                />
                <br />
                <br />
            </form>
            {openPut ? (
                <div align="right">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleChangeModalPut}
                    >
                        CANCEL
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        SAVE
                    </Button>
                </div>
            ) : (
                <div align="right">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleChangeModalAdd}
                    >
                        CANCEL
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        OK
                    </Button>
                </div>
            )}
        </div>
    );

    return (
        <div>
            <Modal
                open={openAdd ? openAdd : false}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            <Modal
                open={openPut ? openPut : false}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
