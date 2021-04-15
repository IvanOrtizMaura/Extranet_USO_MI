// Debug NEXT
// https://www.google.com/search?q=debugger+nextjs&rlz=1C1CHBF_esES901ES901&oq=debugger+nextjs&aqs=chrome..69i57j0i10i22i30i457j0i10i22i30l2.3089j0j7&sourceid=chrome&ie=UTF-8
// https://nextjs.org/docs/advanced-features/debugging

import React, { useEffect,useState } from 'react'

export default function CampoTexto () {

  const valores_iniciales = { 
                              class: '',
                              contador: 0,
                              mensaje:''
                            }
  const [actuales, setValores] = useState(valores_iniciales)
  const [dato,setDato] = useState(-1)

  const convertir_a_numero = (valor) => {
    const resultado = valor === "" ? "esta vacio" 
    : isNaN(valor) ?  "no es un número" 
    : Number(valor)                   // sí convierte a numero
    return resultado  
  }

  useEffect(() => {
    //const {value} = e.target

    const valor_edad = convertir_a_numero(dato)

    if (typeof(valor_edad) === 'number') {
      const color_fondo= (valor_edad > 18) ? 'fondoVerde': 'fondoRojo'
      setValores({ 
        ...actuales, 
        class: color_fondo,
        contador: actuales.contador+1,
        mensaje:''
      })
    }
    else {
      setValores({ 
        ...actuales, 
        mensaje: valor_edad    //contiene mensaje de error
      })
      
    }

  },[dato])

  


  const comprobarEdad = (e) => {
    const {value} = e.target
    setDato (value)
    setValores ({ 
      ...actuales, 
      mensaje: 'cambiando'   
    })
  }

  return (
  
    <div>
      <h3>Has comprobado la edad: {actuales.contador} veces</h3>
      <div className={actuales.class} >     
        <input
                type='text'
                id='edad'
                name='campo_edad'
                onDoubleClick={comprobarEdad}
              />
      </div>
      <h4>Mensaje: {actuales.mensaje}</h4>

      <style jsx>{`
        .fondoRojo {
          background-color:  #ff0000;
          color: white;
          font-size: 1.2em;
          font-family: "Lucida Console"
        }

        .fondoVerde {
          background-color:  #008040;
          font-family: "Arial"
        }
      `}</style>

      <style jsx global>{`
          body {
            padding: 1em;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,sans-serif;
          }
          * {
            box-sizing: border-box;
            }
        `}</style>

      </div>
  )


}


{/*
  Hacer que mesnaje contenga si es mayor o meno de edad (mejor añadiendo función compruebaMatorEdad)
  
  https://bluuweb.github.io/react-udemy/03-jsx/#insertando
*/}
