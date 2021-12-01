import React from "react";
import { Alert } from "@mui/material";

function AlertContainer(props) {
    const errorCode = props.errorCode;

    if (errorCode === 404) {
        return (
        <div className="alert">
            <Alert severity="error">Sorry, we can't get the weather for this location. Please search for somewhere else. </Alert>
        </div>
        )
    } else if (errorCode === 400) {
        return (
        <div className="alert">
            <Alert severity="error">Please enter a place name.</Alert>
        </div>
        )
    } else {
        return (null);
    }
}

export default AlertContainer;