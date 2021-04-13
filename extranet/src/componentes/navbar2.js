
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";
import Image from 'next/image'
import Button from '@material-ui/core/Button';
import Fragment from 'react'


// https://johnny.am/blog/n2-adding-google-fonts-to-nextjs-project



const  useStyles = makeStyles(theme => ({
  barra:{
    justifyContent: "space-around",
    flexGrow:1,
    margin:"0.5em",
    fontFamily: "Arial",
    fontSize: "0.5em",
    color: 'white'
  },
  imagenes:{
    paddingRight:"1em"
  },
  textoTitulo:{
    flexGrow:2,
    color:'#46747d',
    fontSize: 14,
    width: '6%'
  },
  rootButton: {
    //   background: 'linear-gradient(180deg, #FFFFFF 20%, #FFDDEE 80%)',
    borderRadius: 3,
    border: 10,
    color: 'black',
    height: 22,
    padding: '0 10px 0px 10px',
    fontSize: '2em',
    width:'14%',
    //minWidth:'100px',
    margin:'0%'
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
      <Image  src={"/images/logoUSO.png"}  alt="logo de empresa" width={160} height={80} />
      </div> 
      <Typography className={classes.textoTitulo}>
        {texto}
      </Typography>
      <Button classes={{ root: classes.rootButton}} onClick={() => {fn("todo")} }>Todo</Button>
      <Button classes={{root: classes.rootButton}} onClick={() => {fn("1pQe7vhFujf1a0pr3bfmN4tR9kd8-cVcM")} }>Difusión</Button>
      <Button classes={{root: classes.rootButton}} onClick={() => {fn("1Xd4hBk6oGz8FIC6rBdcM44TdTTuI5xdg")} }>Noticias</Button>
      <Button classes={{root: classes.rootButton}} onClick={() => {fn("1yWfAEKX-869SGntzl8jrxq66HIlK5Jvb")} }>Docs</Button>
      </Toolbar>
  </AppBar>
  </div>
  )

  }
