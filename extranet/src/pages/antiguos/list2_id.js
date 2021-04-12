// https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Fragment, useEffect, useState } from 'react'
//import shortid from 'shortid' 

export default function ProgramaListaFichas({datosUsuarios}) {

  const [numUsuario, setNumero] = useState(-1)
  const [nombreUsuario, setNombre] = useState('')
  const [listaUsuarios,setListaUsuarios] = useState(datosUsuarios)
  //      
  const crearLista = (lista) => {
    const lista_formato = lista.map((element, index) => 
        <div key={index}>
            <a onClick={seleccion_idUsuario(element.id)}> 
              Ver la ficha de {element.id} - {element.name}
          </a>
        </div>
    )
    return lista_formato
  }
 
  const seleccion_idUsuario = id_buscado => evento => {
    const indice = listaUsuarios.findIndex(element => element.id === id_buscado)
    console.log("indice",indice)
    setNumero(indice)
  }
  
  
  const cambioNombre = event => {
    const valor = event.target.value
    if (valor === '') setListaUsuarios(datosUsuarios) 
    setNombre(valor)
  }

  const buscaUsuario = () => {
    const nomMinusculas = nombreUsuario.toLowerCase()
    const nueva_lista = listaUsuarios.filter(element => element.name.toLowerCase().includes(nomMinusculas)) 
    console.log(nueva_lista)
    setListaUsuarios(nueva_lista)
    setNumero(-1)
  }
    
 const VerFicha = () => {
  const nuevo_id = datosUsuarios[numUsuario].id 
  const resultado = 
          <div>
            <Link    
              as={`${datosUsuarios[numUsuario].name}`}
              href={`/usuario?id=${nuevo_id}`}>
              <a>
                Nombre: {datosUsuarios[numUsuario].name}
              </a>
            </Link>
            <p>username: {datosUsuarios[numUsuario].username}</p>
            <p>email: {datosUsuarios[numUsuario].email}</p>
          </div>    
  return resultado 
}

  const handleKeyPress = (event) => {
    console.log("eventkey",event.key)
    if (event.key === 'Enter')  buscaUsuario()
  }
  
return (
  <div>
    { crearLista(listaUsuarios) }
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
    {numUsuario>-1 ? VerFicha() : false}
  </div>
)
}

ProgramaListaFichas.getInitialProps = async () => {
  //const response = await fetch ('https://jsonplaceholder.typicode.com/users');

  // Falta try catch
  const response = await fetch('http://localhost:4001/usuarios')
  const listadoDatos = await response.json();
  return {datosUsuarios: listadoDatos}
}