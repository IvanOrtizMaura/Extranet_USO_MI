// google search api: https://developers.google.com/drive/api/v3/search-files
// Crear y subir: https://developers.google.com/drive/api/v3/manage-uploads
// mimetype: https://stackoverflow.com/questions/12523623/how-to-find-folder-in-google-drive


import {NextApiRequest, NextApiResponse} from 'next'

const { google } = require('googleapis')
//const cadena = require('./project-307415-c123db35e353.json')
const scopes = ['https://www.googleapis.com/auth/drive']
  
const auth = new google.auth.JWT(
  process.env.client_email, null,
  process.env.private_key, scopes
)

const drive = google.drive({ version: "v3", auth })

const buscarporParent = async (nombreCarpeta:any) => {
  const  cadena = (nombreCarpeta !='todo') ?`'${nombreCarpeta}' in parents`  : ''
  try {
    const peticionDrive = await drive.files.list({
          //pageSize: 5,
          fields: 'files(id, mimeType, name, webViewLink, parents, createdTime, modifiedTime, originalFilename)',
          orderBy: 'createdTime desc',
          q: cadena
        })

    const listaFiles = peticionDrive.data.files
    return (listaFiles.length) ? listaFiles : 'no files found'
  }

  catch (tipo_error) {
    console.log(tipo_error)
    return { error: 'no hay respuesta en la petición de datos'}
  }    
}


export  default async function busca (req:NextApiRequest, res:NextApiResponse) {
  const carpeta = (req.query.opcion === 'todo') ? 'todo'
  : (req.query.opcion === 'a_sindical') ? '1LRqAb9Dc8qgpaR6C3i3CHXRVL1dUwXfS'
  : (req.query.opcion === 'formacion') ? '1pQe7vhFujf1a0pr3bfmN4tR9kd8-cVcM'
  : (req.query.opcion === 'comunicados') ? '1Xd4hBk6oGz8FIC6rBdcM44TdTTuI5xdg'
  : (req.query.opcion === 'organizacion') ? '1yWfAEKX-869SGntzl8jrxq66HIlK5Jvb' : false

  const listado = await buscarporParent(carpeta)
  //console.log(listado)
  //console.log(carpeta)
  res.json(listado)

}
// Carpetas (las que diga Rocio) po ej:  Noticias, Documentos, ParaDifundir
// Despegable seleccion carpetas : Framer design (un punto + despegable)

