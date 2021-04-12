
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import Image from 'next/image'
import Button from '@material-ui/core/Button';

// https://johnny.am/blog/n2-adding-google-fonts-to-nextjs-project

const  useStyles = makeStyles(theme => ({
  barra:{
    margin:"0.5em",
    fontFamily: "Arial",
    fontSize: "1rem"
  },
  imagenes:{
    padding:"1em"
  },
  Tabs:{
    marginLeft:"auto",
    fontFamily:'Hachi Maru Pop'
   
  }
}))

export default function Encabezado(props) {

  const {texto, fn} = props

  console.log(texto)
  console.log(fn)
  const classes = useStyles()

  return (
    <div>
    
    <AppBar position ="static" color="primary">
      <Toolbar disableGutters className={classes.barra}>
        <div className={classes.imagenes}>
        <Image  src={"/images/spitfire.jpg"}  alt="logo de empresa" width={100} height={100} />
        </div> 
        <Typography variant = "h6" color="secondary">
          {texto}
        </Typography>

        <Tabs className={classes.Tabs}>
        <Button onClick={() => {fn("li")} }>prueba li</Button>
          <Tab label="Difusión" />
          <Tab label="Noticias"/>
          <Tab label="Docs"/>
        </Tabs>

       </Toolbar>
    </AppBar>
    </div>
  );

  }
