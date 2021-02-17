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

export default function CastModal({ open, handleChangeModal }) {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const dispatch = useDispatch();
    const [changeBrand, setChangeBrand] = useState("");
    const [changeModel, setChangeModel] = useState("");
    const [changeCarNumber, setChangeCarNumber] = useState("");
    const [changeEngineType, setChangeEngineType] = useState("");

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

    const handleSubmit = () => {
        const newCar = {
            brand: changeBrand,
            carNumber: changeCarNumber,
            engineType: changeEngineType,
            id: v1(),
            model: changeModel
        };
        console.log(newCar)

            dispatch(actionCreators.createCar(newCar));
        
        
        setChangeBrand("");
        setChangeModel("");
        setChangeCarNumber("");
        setChangeEngineType('');
        handleChangeModal()
    };
    
 
    
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ textTransform: "uppercase" }}>ADD A NEW CAR</h3>
                <div style={{ marginTop: "15px" }}>
                    <CloseIcon onClick={handleChangeModal} />
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
                    label="Brand"
                    variant="filled"
                    value={changeBrand}
                    onChange={(e) => handleChangeBrand(e.currentTarget.value)}
                    style={{ flexBasis: "45%" }}
                    className={clsx(classes.margin, classes.textField)}
                />
                <br />
                <TextField
                    name="model"
                    label="Model"
                    variant="filled"
                    value={changeModel}
                    onChange={(e) => handleChangeModel(e.currentTarget.value)}
                    className={clsx(classes.margin, classes.textField)}
                />
                <br />
                <TextField
                    name="carNumber"
                    label="Car Number"
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
                    label="Engine Type"
                    variant="filled"
                    value={changeEngineType}
                    onChange={(e) =>
                        handleChangeEngineType(e.currentTarget.value)
                    }
                    className={clsx(classes.margin, classes.textField)}
                />
                <br />
                <br />
            </form>
            <div align="right">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleChangeModal}
                >
                    CANCEL
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                >
                    OK
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                // onClose={handleChangeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
