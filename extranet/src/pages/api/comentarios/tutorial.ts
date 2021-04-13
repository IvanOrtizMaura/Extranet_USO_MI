//https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c

import axios from 'axios';

export  default async function pedirRefresh () {
  const code = '4/0AY0e-g7vfR3X1Hvj3N1vTQHk8-Texzi_heaWLvkopiRJFsbDBAiO8gZHOW29tMAR_Wg9Kw'
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: '596632634960-qs8ojbh8n6k74ifsu7hjovqe59tf9hb0.apps.googleusercontent.com',
      client_secret: '6q89XIzwRqolERBWR4P81-JR',
      redirect_uri: 'http://localhost:3000/api/api_comments/recibe',
      grant_type: 'authorization_code',
      code,
    },
  });
  console.log(data); // { access_token, expires_in, token_type, refresh_token }
  return data.access_token;
};