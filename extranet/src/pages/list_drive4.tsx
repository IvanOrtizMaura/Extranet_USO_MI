
// Typescript:  https://youtu.be/v3lI29trIN8
// useEffect: https://daveceddia.com/useeffect-hook-examples/


import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Fragment, useEffect, useState } from 'react'
import FichaDrive from '../../api/FichaDrive'
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button, Input, Popover } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


import Navbar1 from '../componentes/navbar2'
//import ListaComentarios from '../componentes/list_comentarios2'
import fichaComentario from '../pages/api/comentarios/fichaComentario'
import { AutorenewTwoTone } from '@material-ui/icons';

export interface TiposDatos {
  datosDrive: FichaDrive[] | []
}

export interface TiposDatos2 {
  datosComentarios: fichaComentario[] | []
}

// estilos para las cards
const useStyles = makeStyles({
  root: {
    minWidth: 250,
    width: "95%",
    margin: "auto",
    textAlign: "left",
    marginTop: 5, marginBottom: 10,
    boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.5)",
  },
  bullet: {
    display: "inline-block",
    margin: "0,2px",
    transform: "scale(9.8)"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 1,
    fontSize: 12,
    fontWeight: "bold",
    padding: '0.15em'
  },
  title_coment: {
    fontSize: 12,
    paddingLeft: '2em', paddingRight: '2em', paddingTop: "1em"
  },
  pos_coment: {
    fontSize: 10,
    paddingLeft: '2em', paddingRight: '2em',
  },
  derecha: {
    width: "85%",
    textAlign: "right"
  }
});

export default function ProgramaListaFichas({datosDrive}:TiposDatos) {

  const listadoCinicial:any = [] 
  const [fileIdComentario, setfileIdComentario] = useState('')
  const [nombreUsuario, setNombre] = useState('')
  const [listaDrive,setlistaDrive] = useState(datosDrive)
  const [listaComentarios,setlistaComentarios] = useState(listadoCinicial)
  const [anchorEl, setAnchorEl] = useState(null)

  const classes = useStyles();
         
  const crearLista = (lista:typeof datosDrive) => {

    const formatFecha = (fechalarga:any) => {
      const cadena = fechalarga.toString()
      return cadena.slice(0,10)
    }

    if (lista.length === 0) return <p>No hay datos</p>
    const lista_formato = lista.map((element:any, index:number) => 
        
        <Card variant="outlined" className={classes.root} key={element.id}>
          <CardContent key={element.id} >
          <Typography className={classes.title}color="textPrimary" gutterBottom key={element.id} >
            <strong>{element.name}</strong>
          </Typography>

          <Typography className={classes.pos} color="textSecondary" key={element.id} >
            Fecha creacion: {formatFecha(element.createdTime)} , modificado: {formatFecha(element.modifiedTime)}
          </Typography>

          <Typography className={classes.pos}color="textSecondary" key={element.id} >
            Enlace a archivo:{' - '}
            <a target="_blank" href={element.webViewLink}>
              {element.name}
            </a>
          </Typography>

          <div className={classes.derecha}>
            <button key={element.id} onClick={asignaFileIdComentario} value={element.id}>comentarios</button>
          </div>

          </CardContent>
        </Card>
   
    )
    return lista_formato
  }

  useEffect(() => {
    const leerDatos = async () => {      
      const cadena = `http://localhost:3000/api/comentarios/${fileIdComentario}/getComentarios`
      try {
      const response = await fetch(cadena)
      const listadoC:fichaComentario[] | [] = await response.json()
      setlistaComentarios(listadoC)
      }
      catch (tipo_error){
        console.log("tipo error",tipo_error)
        setlistaComentarios([])
      }
    }
    leerDatos()
  }, [fileIdComentario]) 

 
  const ListaComentarios = () => {
    const formatFecha = (fechalarga:any) => {
      const cadena = fechalarga.toString()
      return cadena.slice(0,10)
    }
    if (listaComentarios.length === 0) return <p className={classes.title_coment}>comentarios</p>
    const lista_formato = listaComentarios.map((element:any, index:number) => 
        <Fragment>   
        <Typography className={classes.title_coment}color="textPrimary" gutterBottom key={element.id} >
          <strong>{element.content}</strong>
        </Typography>

        <Typography className={classes.pos_coment} color="textSecondary" key={element.id} >
          autor: {element.author.displayName}
        </Typography>

        <Typography className={classes.pos_coment} color="textSecondary" key={element.id} >
          Fecha creacion: {formatFecha(element.createdTime)} , modificado: {formatFecha(element.modifiedTime)}
        </Typography>

        </Fragment>      
    )
    return lista_formato
  }

  const asignaFileIdComentario = (event:any) => {
    const valor = event.target.value
    valor && setfileIdComentario(valor) 
    setAnchorEl(event.currentTarget)
  }

   const cambioNombre = (event:any) => {
    const valor = event.target.value
    if (valor === '') setlistaDrive(datosDrive) 
    setNombre(valor)
  }

  const buscaUsuario = () => {
    const nomMinusculas = nombreUsuario.toLowerCase()
    const nueva_lista = listaDrive.filter(element => element.name.toLowerCase().includes(nomMinusculas)) 
    //console.log(nueva_lista)
    setlistaDrive(nueva_lista)
  }

  const filtrarCarpeta = (idCarpeta:any) => {
    if (idCarpeta === 'todo') {
      setlistaDrive(datosDrive)
    }
    else {
    // element.parents  es un array. Durante el filtrado, recorremos array parents para extraer el primero
    const map_parents = datosDrive.filter((element:any) => {
      if(element.parents){
      const padres = element.parents 
      const primerpadre = padres[0]     
      return (primerpadre===idCarpeta) ? element: false
      }
      return 
    })
    setlistaDrive(map_parents)
    }
  }
    
   const handleKeyPress = (event:any) => {
    console.log("eventkey",event.key)
    if (event.key === 'Enter')  buscaUsuario()
  }

  const cerrar_popover = () => {
    setAnchorEl(null);
  }

  const textoempresa = "Extranet"
  const open_popover = Boolean(anchorEl);
  const id_popover = open_popover ? 'pop comentarios' : undefined;

return (
  <Fragment>
    <Navbar1 texto={textoempresa} fn={filtrarCarpeta} />
    <br/><br/>
    <Popover id={id_popover}
        open={open_popover}
        anchorEl={anchorEl}
        onClose={cerrar_popover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
        transformOrigin={{ vertical: 'top', horizontal: 'center', }}
    >

      <ListaComentarios  />

    </Popover>
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
    <br/><br/>
    { crearLista(listaDrive) }

  </Fragment>
)
}


ProgramaListaFichas.getInitialProps = async () => {
  try {
  const response = await fetch('http://localhost:3000/api/drive/todo/carpetas')
  const listadoDatos:FichaDrive[] | [] = await response.json()
  //console.log("listado en fetch",listadoDatos)
  return {datosDrive: listadoDatos}
  }
  catch (tipo_error){
    console.log("tipo error",tipo_error)
    return {datosDrive: []}
}

}