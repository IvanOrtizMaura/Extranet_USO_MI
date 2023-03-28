
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";
//import Image from 'next/image'
import Button from '@material-ui/core/Button';
import Fragment from 'react'
import Link from "next/link";
import { ArrowRight } from "@material-ui/icons";

// https://johnny.am/blog/n2-adding-google-fonts-to-nextjs-project

const  useStyles = makeStyles(theme => ({
  barra:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'left',
    alignItems:'center',
    margin:"0.5rem 0 0.5rem 0",
    fontFamily: "Arial",
    //fontSize: "0.5em",
    color: 'white',
    // paddingBottom:'0rem',
    //borderBottom:'0.1rem solid #cccccc'
  },
  imagenes:{
    padding:'0 2rem 0.5rem 0.5rem'
  },
  textoTitulo:{
    color:'#46747d',
    fontSize: 16,
    minWidth: '120px'
  },
  rootButton: {
    //justifyContent: 'right',
    borderBottom: '1px solid #cccccc',
    color: 'black',
    textAlign:'left',
    alignContent:'right',
    height: 38,
    padding: '1rem 0.25rem 0.70rem 0',
    fontSize: '0.75rem',
    width: '300px',
    margin:'0 0 0 0'
    /* [theme.breakpoints.up(500)]: {
      margin:'1rem 0 1rem 0'
    }, */
  }

}))

export default function Encabezado(props) {

  const {texto, fn} = props
  const classes = useStyles()
  
  return (
  <div  className={classes.barra}>
      <div className={classes.imagenes}>
        { /* <Image  src={"/images/logoUSO.png"}  alt="logo de empresa" width={160} height={80} />  */}
        <Link as={`/`} href={`/`}>
          <a> 
            <img src="/images/usoib.jpg" alt='ir a inicio'></img>
          </a>
        </Link>
      </div> 

      <div>
      <Typography className={classes.textoTitulo} color="textSecondary"  >
        {texto}
      </Typography>
      </div>
  
      <div>
        <Button classes={{root: classes.rootButton}} onClick={() => {fn("1yWfAEKX-869SGntzl8jrxq66HIlK5Jvb")} }>Organización</Button>
        <Button classes={{root: classes.rootButton}} onClick={() => {fn("1LRqAb9Dc8qgpaR6C3i3CHXRVL1dUwXfS")} }>A.Sindical</Button>
        <Button classes={{root: classes.rootButton}} onClick={() => {fn("1pQe7vhFujf1a0pr3bfmN4tR9kd8-cVcM")} }>Formación</Button>
        <Button classes={{root: classes.rootButton}} onClick={() => {fn("1Xd4hBk6oGz8FIC6rBdcM44TdTTuI5xdg")} }>Comunicados</Button>
      </div> 

  </div>
  )

  }
