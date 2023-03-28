// https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Fragment, useEffect, useState } from 'react';

export default function List({datosUsuarios}) {

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

  // currying : ver ejercicio 5_1. 5_2 , 5_3   https://github.com/matias-ibserveis/curso_react
  
  const seleccion_idUsuario = id_buscado => evento => {
    //const indice = listaUsuarios.findIndex(element => element.id === id_buscado)
    setNumero(id_buscado-1)
  }
  
  const cambioNombre = event => {
    const valor = event.target.value
    if (valor === '') setListaUsuarios(datosUsuarios) 
    console.log("valor",valor)
    console.log("lista",listaUsuarios)
    setNombre(valor)
  }

  const buscaUsuario = () => {
    console.log(nombreUsuario)
    const nomMinusculas = nombreUsuario.toLowerCase()
    const nueva_lista = listaUsuarios.filter(element => element.name.toLowerCase().includes(nomMinusculas)) 
    // https://stackoverflow.com/questions/44312924/filter-array-of-objects-whose-any-properties-contains-a-value
    console.log(nueva_lista)
    setListaUsuarios(nueva_lista)
    setNumero(-1)
  }
    
  const VerFicha = () => {
    console.log("en VerFicha numUsuario=",numUsuario)
    //console.log("listaUsuarios en Ver",listaUsuarios)
    const resultado = 
            <div>
              <h3>Nombre: {datosUsuarios[numUsuario].name}</h3>
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

  { numUsuario>-1 ? VerFicha() : false}

  </div>
)
}

List.getInitialProps = async () => {
  //const response = await fetch
  ('https://jsonplaceholder.typicode.com/users');
  const response = await fetch('http://localhost:4001/usuarios')
  const listadoDatos = await response.json();
  return {datosUsuarios: listadoDatos}
}