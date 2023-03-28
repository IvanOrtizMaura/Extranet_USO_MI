
// Typescript:  https://youtu.be/v3lI29trIN8

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Fragment, useEffect, useState } from 'react'
import FichaDrive from '../../api/FichaDrive'

export interface TiposDatos {
  datosDrive: FichaDrive[] | []
}

export default function ProgramaListaFichas({datosDrive}:TiposDatos) {

  const [idenUsuario, setIdenUsuario] = useState(-1)
  const [nombreUsuario, setNombre] = useState('')
  const [listaDrive,setlistaDrive] = useState(datosDrive)
       
  const crearLista = (lista:typeof datosDrive) => {
    if (lista.length === 0) return <p>No hay datos</p>
    const lista_formato = lista.map((element:any, index:number) => 
        <div key={index}>
             <h3>Nombre archivo:  {element.name} </h3> 
             <p>id:{element.id}</p>
             <p>fechas creacion: {element.createdTime} {element.modifiedTime}</p>
             <p><a target="_blank" href={element.webViewLink}>Enlace a archivo: {element.name}</a></p>
        </div>
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
    
   const handleKeyPress = (event:any) => {
    console.log("eventkey",event.key)
    if (event.key === 'Enter')  buscaUsuario()
  }
  
return (
  <div>
    { crearLista(listaDrive) }
    <input
                type='text'
                id='nombre'
                name='campo_nombre'
                value= {nombreUsuario}
                onChange={cambioNombre}
                onDoubleClick={buscaUsuario}
                onKeyUp={handleKeyPress}
              />
    <p>Escribe nombre a buscar</p> 
    <br/>
  </div>
)
}


ProgramaListaFichas.getInitialProps = async () => {
  try {
  const response = await fetch('http://localhost:3000/api/drive/trabajos/carpetas')
  const listadoDatos:FichaDrive[] | [] = await response.json()
  console.log("listadoDatos",listadoDatos)

  return {datosDrive: listadoDatos}
  }
  catch (tipo_error){
    return {datosDrive: []}
}

}