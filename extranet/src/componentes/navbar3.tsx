import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Toolbar } from "@material-ui/core";


export default function SimpleTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const {texto, fn} = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="absolute">
      <Toolbar>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Typography variant="h4">{texto}</Typography>
          
          <Tab label="Todo" onClick={() => {fn("todo")}}/>
          <Tab label="Difusión" onClick={() => {fn("1pQe7vhFujf1a0pr3bfmN4tR9kd8-cVcM")}} />
          <Tab label="Noticias" onClick={() => {fn("1Xd4hBk6oGz8FIC6rBdcM44TdTTuI5xdg")}} />
          <Tab label="Documentos" onClick={() => {fn("1yWfAEKX-869SGntzl8jrxq66HIlK5Jvb")}} />
        </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}
