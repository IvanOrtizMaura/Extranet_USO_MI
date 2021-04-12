//https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c

// PRUEBAS (Execute)
// https://developers.google.com/drive/api/v3/reference/comments/list?apix_params=%7B%22fileId%22%3A%221mIHCAxrfBexDbY29ydPgNdkkrJam65DI%22%2C%22fields%22%3A%22content%22%7D


// refresh_token:  1//03qaBeF9N-J_SCgYIARAAGAMSNwF-L9IrIEYlPvjOhs4eO6NBS87Wj_D4NmHg5BERHhFxPwXptTkSLkOPJpY4zla7IPlENbLCRas

// AQUÍ HAY QUE HACER COMO EN getACCESO, utilizar el refresh para pedir access_token

import Acceso from '../getAcceso1'

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
    console.log("respuesta:",respuesta)
    return respuesta
  }
  catch (tipo_error){
      return {"error": tipo_error}
  }
}


export  default async function recibe (req:NextApiRequest, res:NextApiResponse) {
  //const codigo = req.query.code   mejor env = https://www.npmjs.com/package/dotenv

  const idFile = req.query.identificador 

  const cadenaAcceso = await Acceso()
  //console.log("cadenaAcceso",cadenaAcceso)

  // 1mIHCAxrfBexDbY29ydPgNdkkrJam65DI
  const resultado= await getcomment(idFile, cadenaAcceso)
  
  console.log("idfile", idFile)
  console.log("resultado:", resultado)
   

  return //"aquivalor resultado"
}

// http://localhost:3000/api/1mIHCAxrfBexDbY29ydPgNdkkrJam65DI/getComentarios1

// Si recibimos refresh_token y lo guardamos en "cookie", la próxima entrada del usuario no necesitará
// petición a Google.     
// Podemos guardar "refresh_token" como const para TODOS usuarios y NO UTILIZAR TODO CODIO  ANTERIOR
// Utiliza refresh token para pedir access_token
