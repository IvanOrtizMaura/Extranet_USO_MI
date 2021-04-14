import React from 'react';
import { ThemeProvider } from '@material-ui/styles'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";


import theme from './styles/themeNavBar4';

export default function NavBarCursos(props) {
    const [value, setValue] = React.useState(0)
    const { texto, fn } = props;


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar position="absolute" >
                    <Toolbar>
                        <img src={"/images/LogoUSO.jpg"} alt="Logo empresa" style={{ width: "100px" }} />

                        <Tabs value={value} onChanage={handleChange} aria-label="simple tabs example" style={{}}>

                            <Typography variant="h4">{texto}</Typography>
                            <Tab label="Videos" />
                            <Tab label="Cursos" />
                            <Tab label="Extranet" />
                        </Tabs>

                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    )
}