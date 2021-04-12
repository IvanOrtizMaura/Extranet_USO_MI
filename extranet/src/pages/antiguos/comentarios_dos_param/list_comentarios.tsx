
// Typescript:  https://youtu.be/v3lI29trIN8


import fetch from 'isomorphic-unfetch';
import { Fragment, useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Input } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import classes from '*.module.css';

import fichaComentario from './api/comentarios/fichaComentario'


export interface TiposDatos {
  datosDrive: fichaComentario[] | []
}

// estilos para las cards
const useStyles = makeStyles({
  root: {
    minWidth: 250,
    width: "85%",
    margin: "auto",
    textAlign: "left",
    marginTop: 5, marginBottom: 10,
    boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.5)",
    padding:'0.05em'
  },
  bullet: {
    display: "inline-block",
    margin: "0,2px",
    transform: "scale(9.8)"
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "bold",
    padding: '0.25em'
  }
});

export default function ProgramaListaFichas({datosDrive}:TiposDatos) {

  const [listaDrive,setlistaDrive] = useState(datosDrive)

  // para cards
  const classes = useStyles();
         
  const crearLista = (lista:typeof datosDrive) => {

    const formatFecha = (fechalarga:any) => {
      const cadena = fechalarga.toString()
      return cadena.slice(0,10)
    }

    if (lista.length === 0) return <p>No hay datos</p>
    const lista_formato = lista.map((element:any, index:number) => 
        <Card
        variant="outlined"
        className={classes.root}
        key={index}>
          <CardContent>
            <Typography className={classes.title}color="textPrimary"gutterBottom>
              <strong>{element.content}</strong>
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              autor: {element.author.displayName}
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              Fecha creacion: {formatFecha(element.createdTime)} , modificado: {formatFecha(element.modifiedTime)}
            </Typography>
             
          </CardContent>
        </Card>
    )
    return lista_formato
  }
 
return (
  <div>
    { crearLista(listaDrive) }
  </div>
)
}


ProgramaListaFichas.getInitialProps = async () => {
  // http://localhost:3000/api/comentarios/aquí va el fileID del archivo que queremos ver los comentarios/getComentarios
  // ejemplo: fileId del archivo llamado libro_cuantico.pdf
  try {
  const response = await fetch('http://localhost:3000/api/comentarios/1mIHCAxrfBexDbY29ydPgNdkkrJam65DI/getComentarios')
  const listadoDatos:any | [] = await response.json()
  console.log("listadoDatos:", listadoDatos.cadenaAcceso)
  return {datosDrive: []}
  /*
  const listadoDatos:fichaComentario[] | [] = await comentarios.json()
  //console.log("listado en fetch",listadoDatos)
  return {datosDrive: listadoDatos} 
  */
  }
  catch (tipo_error){
    console.log("tipo error",tipo_error)
    return (tipo_error)
    //return {datosDrive: []}
}

}