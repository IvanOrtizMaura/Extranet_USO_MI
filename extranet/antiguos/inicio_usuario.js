// https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c

// 1) creación OAuth 2.0 Client IDs:
// client secret: 6q89XIzwRqolERBWR4P81-JR
// client id:596632634960-qs8ojbh8n6k74ifsu7hjovqe59tf9hb0.apps.googleusercontent.com

// 2) OAuth consent screen

// Tras primer paso en esta mismo código (consentimiento usuario)
// code=4/0AY0e-g4ErRHiAu7zQ8WPSARr5NCX1WK0Svg8ZL0dr-XKPyvD9uVqbrs_MynWJytaovz0VA&scope=https://www.googleapis.com/auth/drive

// Este inicio1.js es para generar un https://www.example.com/authenticate/google?code=CODE_IS_HERE
// un ?code que es enviado a  api/recibe.ts
// /recibe.ts enviará petició a Google y este contestatrá con un access-token Y UN refresh-token!!!
// console.log(data); // { access_token, expires_in, token_type, refresh_token }
// SI ya tenemos refresh-tpoken, no hace falta todas estas peticiones. Podemos ir directamente  recibe.ts 

import * as queryString from 'query-string';

export default function inicio() {

 const stringifiedParams = queryString.stringify({
    client_id: '596632634960-qs8ojbh8n6k74ifsu7hjovqe59tf9hb0.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:3000/api/api_comments/recibe',  
    scope: ['https://www.googleapis.com/auth/drive'],
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  
return (
  <div>
   <a href={googleLoginUrl}>
    Login with Google
  </a>
  </div>
)
}


// Este archivo solo necesita ejecutarse una vez. Consigue refresh_token  que sirve para muchas veces luego



