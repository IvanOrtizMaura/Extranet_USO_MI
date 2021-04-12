
// Typescript:  https://youtu.be/v3lI29trIN8


import fetch from 'isomorphic-unfetch';
import { Fragment, useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Input } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import classes from '*.module.css';


import fichaComentario from '../pages/api/comentarios/fichaComentario'


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
    marginTop: 0, marginBottom: 0,
    //boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.5)",
    padding:0
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

//export default function ListaComentarios({datosDrive}:TiposDatos, {fileId}:any) {
export default function ListaComentarios({fileId}:any) {

  const [ficheroId, setFicheroId]= useState(fileId)
  const datosDrive:fichaComentario[] | [] = []
  const [listaDrive,setlistaDrive] = useState(datosDrive) 
  const classes = useStyles();

  const leerDatos = async () => {

    const cadena = `http://localhost:3000/api/comentarios/${ficheroId}/getComentarios`
    try {
    const response = await fetch(cadena)
    const listadoDatos:fichaComentario[] | [] = await response.json()
    //return {datosDrive: listadoDatos} 
    setlistaDrive(listadoDatos)
  
    }
    catch (tipo_error){
      console.log("tipo error",tipo_error)
      return {datosDrive: []}
  }
  }
         
  const crearLista = (lista:typeof listaDrive) => {
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

      <Input
                type='text'
                id='nombre'
                name='prueba'
                onDoubleClick={leerDatos}
                placeholder="Haz doble click aquí"
              />

    { /* {datosDrive.length} comentarios */ }
    { listaDrive.length >0 ? crearLista(listaDrive) : false }
  </div>
)
}

