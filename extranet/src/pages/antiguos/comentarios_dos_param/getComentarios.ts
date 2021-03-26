//https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c

// PRUEBAS (Execute)
// https://developers.google.com/drive/api/v3/reference/comments/list?apix_params=%7B%22fileId%22%3A%221mIHCAxrfBexDbY29ydPgNdkkrJam65DI%22%2C%22fields%22%3A%22content%22%7D

// Aqui llamamos a getAcceso para que no devuelva un access_token

import Acceso from '../getAcceso'

import {NextApiRequest, NextApiResponse} from 'next'

async function getcomment(fileId:any, token:any) {
  const cadena_url = `https://www.googleapis.com/drive/v3/files/${fileId}/comments?includeDeleted=false&pageSize=20&fields=*`
  const cadena_token = `Bearer ${token}`

	try {
    const res = await fetch(cadena_url , {
      headers: {
          'authorization': cadena_token
      }
    })
    const respuesta = await res.json()
    return respuesta
  }
  catch (tipo_error){
      return {"error": tipo_error}
  }
}


export  default async function recibe (req:NextApiRequest, res:NextApiResponse) {
  const idFile = req.query.identificador 
    //const idFile='1mIHCAxrfBexDbY29ydPgNdkkrJam65DI'
  const cadenaAcceso = await Acceso()
  const resultado= await getcomment(idFile, cadenaAcceso) 
  //console.log("resultado",resultado.comments)
  const final = { 
      comentarios: resultado.comments,
      cadenaAcceso: cadenaAcceso
  }
  console.log("final.comentarios:", final.comentarios)
  res.json(final)
}

// http://localhost:3000/api/comentarios/1mIHCAxrfBexDbY29ydPgNdkkrJam65DI/getComentarios

// Si recibimos refresh_token y lo guardamos en "cookie", la próxima entrada del usuario no necesitará
// petición a Google.     
// Podemos guardar "refresh_token" como const para TODOS usuarios y NO UTILIZAR TODO CODIGO de getAcceso
// Luego utilizamos refresh token para pedir access_token

