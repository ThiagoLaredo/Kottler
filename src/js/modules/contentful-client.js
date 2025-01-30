import { createClient } from 'contentful';

console.log('Inicializando Contentful Client');

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Teste se o cliente está realmente inicializando
client.getEntries({ content_type: "projeto" })
  .then(() => console.log("Contentful conectado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar com o Contentful:", err));
