import React from "react";
import TableForm from "./Component/Table";
import AppBar from "./Component/AppBar";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

const App = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar />
                <TableForm />
            </ThemeProvider>
        </div>
    );
};

export default App;
