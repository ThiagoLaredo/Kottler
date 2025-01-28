import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,  // Usando a variável injetada
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // Usando a variável injetada
});