// migrate.js
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'TU_ID_DE_PROYECTO',
  dataset: 'production',
  useCdn: false,
  token: 'TU_TOKEN_CON_PERMISOS_DE_ESCRITURA', // Consíguelo en manage.sanity.io
  apiVersion: '2023-05-03',
})

async function migrate() {
  // Buscamos posts donde el campo 'body' o 'faqSection' no existen (son null)
  const docs = await client.fetch('*[_type == "post" && (!defined(body) || !defined(faqSection))]')
  
  console.log(`Reparando ${docs.length} documentos...`)

  for (const doc of docs) {
    await client
      .patch(doc._id)
      .setIfMissing({ 
        body: [], 
        faqSection: [], 
        apellidosRelacionados: [] 
      })
      .commit()
    console.log(`✅ Documento ${doc._id} actualizado`)
  }
}

migrate()