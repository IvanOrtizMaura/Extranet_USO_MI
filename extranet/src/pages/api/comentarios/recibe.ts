//https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c

// Secretos
// https://www.npmjs.com/package/dotenv

// google v3: https://developers.google.com/drive/api/v3/fields-parameter


import axios from 'axios'
import {NextApiRequest, NextApiResponse} from 'next'
const request = require("request")

async function getAccessTokenFromCode() {
  // recibir en parametro de la funcion, proveniente de env  :  https://www.npmjs.com/package/dotenv
  const refresh= '1//03qaBeF9N-J_SCgYIARAAGAMSNwF-L9IrIEYlPvjOhs4eO6NBS87Wj_D4NmHg5BERHhFxPwXptTkSLkOPJpY4zla7IPlENbLCRas'
  if (refresh){       // Si no existe, reenviar a Login Google
		console.log("Sí, existe refresh_token")

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		// client_it y client_secret no deberian verse. Es provisional porque al final este código estará en servidor 
		const urlencoded = new URLSearchParams();
		urlencoded.append("client_id", "596632634960-qs8ojbh8n6k74ifsu7hjovqe59tf9hb0.apps.googleusercontent.com");
		urlencoded.append("client_secret", "6q89XIzwRqolERBWR4P81-JR");
		urlencoded.append("refresh_token",refresh);
		urlencoded.append("grant_type", "refresh_token");

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		};

		try {
			const res = await fetch("https://www.googleapis.com/oauth2/v4/token", requestOptions)
			const respuesta = await res.json()
			console.log("token para utilizar durante 1h:",respuesta.access_token)
      return respuesta.access_token
		}
		catch (tipo_error){
				return {"error": tipo_error}
		}
	} 
}


async function getComments(fileId:string, token:any) {
  const cadena_url = `https://www.googleapis.com/drive/v3/files/${fileId}/comments`
  const cadena_token = `Bearer ${token}`
  const options = { method: 'GET',
  url: cadena_url,
  qs: 
   { includeDeleted: 'false',
     pageSize: '20',
     fields: '*'   //author, content ... no funcionan
    },
  headers: { authorization: cadena_token } };

request(options, function (error:any, response:any, body:any) {
  if (error) throw new Error(error);
  console.log("el body es",body);
});
}



export  default async function recibe (req:NextApiRequest, res:NextApiResponse) {
  //const codigo = req.query.code
  const resultado= await getAccessTokenFromCode()
  console.log("acces_token es:", resultado)
  const comentarios = getComments('1mIHCAxrfBexDbY29ydPgNdkkrJam65DI', resultado)
  console.log("comentarios :", comentarios)

  return 
}

// Si recibimos refresh_token y lo guardamos en "cookie", la próxima entrada del usuario no necesitará
// petición a Google.     
// Podemos guardar "refresh_token" como const para TODOS usuarios y NO UTILIZAR TODO CODIO  ANTERIOR
// App.svelte utiliza refresh token para pedir access_token
