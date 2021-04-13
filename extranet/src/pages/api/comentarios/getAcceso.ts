//https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c
// Secretos
// https://www.npmjs.com/package/dotenv
// google v3: https://developers.google.com/drive/api/v3/fields-parameter


async function getAccessTokenFromRefresh(refresh:any) {
  // refresh = recibir en parametro en esta función, proveniente de env  :  https://www.npmjs.com/package/dotenv
  // OJO!!!!  Duran aprox. 1 semana?  los refresh_token
	//const refresh= '1//03qaBeF9N-J_SCgYIARAAGAMSNwF-L9IrIEYlPvjOhs4eO6NBS87Wj_D4NmHg5BERHhFxPwXptTkSLkOPJpY4zla7IPlENbLCRas'
  
	if (refresh){       // Si no existe, reenviar a Login Google ???? (por ahora, no dejar entrar y ya está)

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		// client_id y client_secret no deberian verse. ¿carpeta env?
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
			//console.log("token para utilizar durante 1h:",respuesta.access_token)
      return respuesta.access_token
		}
		catch (tipo_error){
				return {"error": tipo_error}
		}
	} 
}


async function getRefresfromCode() {
	// code obtenido de inicio_usuario.ts  -> google 
	const code = '4/0AY0e-g4ypkrlsH3WZjE5GGZpw0qRawcWzC9B4DT2syIHLXhjSVD1gvsnt3b-IxDio-W34Q'

	const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		// client_id y client_secret no deberian verse. ¿carpeta env?
		const urlencoded = new URLSearchParams();
		urlencoded.append("client_id", "596632634960-qs8ojbh8n6k74ifsu7hjovqe59tf9hb0.apps.googleusercontent.com");
		urlencoded.append("client_secret", "6q89XIzwRqolERBWR4P81-JR");
		urlencoded.append("redirect_uri", "http://localhost:3000/api/api_comments/recibe");
		urlencoded.append("grant_type", "authorization_code");
		urlencoded.append("code", code)

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		};

		try {
			const res = await fetch("https://www.googleapis.com/oauth2/v4/token", requestOptions)
			const respuesta = await res.json()
			//console.log("respuesta:",respuesta)
			//console.log("refresh en funcion:",refresh_token)
      return respuesta.refresh_token
		}
		catch (tipo_error){
				return {"error": tipo_error}
		}

}


export  default async function pedirAcceso () {

	// code se consigue desde archivo  inicio_usuario , google reenvia a recibe?code=XXX
	//const code = '4/0AY0e-g7vfR3X1Hvj3N1vTQHk8-Texzi_heaWLvkopiRJFsbDBAiO8gZHOW29tMAR_Wg9Kw'
	
	// Solo sirve 1 vez el code anterior . Hay que pedir code nuevo archivo:   inicio_usuario.ts
	//const refresh = getRefresfromCode(code)	
	
	const refresh = '1//03QHAMs5thyqSCgYIARAAGAMSNwF-L9IrrTLtSuzVOrOYAWzbcV2QpFTifGRX70-W8iCbD4iwWa90H1WHyF-OLYvyBb4N8Nt_lHs'
  const resultado= await getAccessTokenFromRefresh(refresh)
  //console.log("acces_token es:", resultado)
  return resultado
}


// Si recibimos refresh_token y lo guardamos en "cookie", la próxima entrada del usuario no necesitará
// petición a Google.     
// Podemos guardar "refresh_token" como const para TODOS usuarios y NO UTILIZAR TODO CODIO  ANTERIOR
// Utiliza refresh token para pedir access_token
