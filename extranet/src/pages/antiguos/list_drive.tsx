
// Typescript:  https://youtu.be/v3lI29trIN8

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Fragment, useEffect, useState } from 'react'
import FichaDrive from '../../api/FichaDrive'
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Input } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import classes from '*.module.css';

import Navbar1 from '../../src/componentes/navbar1'

export interface TiposDatos {
  datosDrive: FichaDrive[] | []
}

// estilos para las cards
const useStyles = makeStyles({
  root: {
    minWidth: 250,
    width: "80%",
    margin: "auto",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.5)",
  },
  bullet: {
    display: "inline-block",
    margin: "0,2px",
    transform: "scale(9.8)"
  },
  title: {
    fontSize: 20
  },
  pos: {
    marginBottom: 5,
    fontSize: 15
  }
});

export default function ProgramaListaFichas({datosDrive}:TiposDatos) {

  const [idenUsuario, setIdenUsuario] = useState(-1)
  const [nombreUsuario, setNombre] = useState('')
  const [listaDrive,setlistaDrive] = useState(datosDrive)

  // para cards
  const classes = useStyles();
         
  const crearLista = (lista:typeof datosDrive) => {
    if (lista.length === 0) return <p>No hay datos</p>
    const lista_formato = lista.map((element:any, index:number) => 
        <Card
        variant="outlined"
        className={classes.root}
        key={index}>
          <CardContent>
             <Typography className={classes.title}color="textPrimary"gutterBottom>
               <strong>{element.name}</strong>
              </Typography> 

              <Typography className={classes.pos} color="textSecondary">
               <strong>ID: </strong>{element.id}
              </Typography>

             <Typography className={classes.pos} color="textSecondary">
               <strong>Fecha creacion: </strong>{element.createdTime}
              </Typography>

             <Typography className={classes.pos} color="textSecondary">
               <strong>Fecha modificación: </strong>{element.modifiedTime}
              </Typography>

             <Typography className={classes.pos}color="textSecondary">
               <strong>Enlace a archivo: </strong>
               <a target="_blank" href={element.webViewLink}>
               {element.name}
                </a>
              </Typography>
             
          </CardContent>
        </Card>
    )
    return lista_formato
  }
 
   const cambioNombre = (event:any) => {
    const valor = event.target.value
    if (valor === '') setlistaDrive(datosDrive) 
    setNombre(valor)
  }

  const buscaUsuario = () => {
    const nomMinusculas = nombreUsuario.toLowerCase()
    const nueva_lista = listaDrive.filter(element => element.name.toLowerCase().includes(nomMinusculas)) 
    console.log(nueva_lista)
    setlistaDrive(nueva_lista)
    setIdenUsuario(-1)
  }

  const prueba = (param:any) => {
    console.log(param)
    const nomMinusculas = param.toLowerCase()
    const nueva_lista = listaDrive.filter(element => element.name.toLowerCase().includes(nomMinusculas)) 
    console.log(nueva_lista)
    setlistaDrive(nueva_lista)
    setIdenUsuario(-1)
    
  }
    
   const handleKeyPress = (event:any) => {
    console.log("eventkey",event.key)
    if (event.key === 'Enter')  buscaUsuario()
  }

  const textoempresa = "USO"

return (
  <div>
    <Navbar1 texto={textoempresa} fn={prueba} />
    <button value='Buenos dias' onClick={buscaUsuario}>hola</button>
    <Input
                type='text'
                id='nombre'
                name='campo_nombre'
                className="buscador"
                value= {nombreUsuario}
                onChange={cambioNombre}
                onDoubleClick={buscaUsuario}
                onKeyUp={handleKeyPress}
                placeholder="Escribe nombre a buscar"
              />
    <br/>
    { crearLista(listaDrive) }

  </div>
)
}


ProgramaListaFichas.getInitialProps = async () => {
  try {
  const response = await fetch('http://localhost:3000/api/drive/trabajos/carpetas')
  const listadoDatos:FichaDrive[] | [] = await response.json()
  return {datosDrive: listadoDatos}
  }
  catch (tipo_error){
    return {datosDrive: []}
}

}