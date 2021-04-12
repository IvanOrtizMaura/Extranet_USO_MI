
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";
import Image from 'next/image'
import Button from '@material-ui/core/Button';


// https://johnny.am/blog/n2-adding-google-fonts-to-nextjs-project



const  useStyles = makeStyles(theme => ({
  barra:{
    margin:"0.5em",
    fontFamily: "Arial",
    fontSize: "1rem",
    color: 'white'
  },
  imagenes:{
    paddingRight:"5em"
  }
}))

export default function Encabezado(props) {

  const {texto, fn} = props
  const classes = useStyles()
  
  return (
    <div>
    
    <AppBar position ="static" color="#bf2b54">
      <Toolbar disableGutters className={classes.barra}>
        <div className={classes.imagenes}>
        <Image  src={"/images/logoUSO.png"}  alt="logo de empresa" width={140} height={70} />
        </div> 
        <Typography variant = "h6" color="secondary">
          {texto}
        </Typography>
        <Button color="white" onClick={() => {fn("todo")} }>Todo</Button>
        <Button onClick={() => {fn("1pQe7vhFujf1a0pr3bfmN4tR9kd8-cVcM")} }>Difusión</Button>
        <Button onClick={() => {fn("1Xd4hBk6oGz8FIC6rBdcM44TdTTuI5xdg")} }>Noticias</Button>
        <Button onClick={() => {fn("1yWfAEKX-869SGntzl8jrxq66HIlK5Jvb")} }>Documentos</Button>
       </Toolbar>
    </AppBar>
    </div>
  );

  }
