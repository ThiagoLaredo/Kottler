import { createClient } from 'contentful';

// console.log('Space ID:', process.env.CONTENTFUL_SPACE_ID);
// console.log('Access Token:', process.env.CONTENTFUL_ACCESS_TOKEN);

// Inicializar o cliente Contentful
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,  // Usando a variável injetada
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // Usando a variável injetada
});
