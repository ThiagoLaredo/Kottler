// export async function fetchWordPressPosts(page = 1, perPage = 5) {
//   const apiURL = `https://agenciakottler.com.br/blog/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`;
  
//   try {
//     const response = await fetch(apiURL);
//     if (!response.ok) {
//       throw new Error('Erro ao buscar os dados da API');
//     }

//     const totalPosts = response.headers.get('X-WP-Total'); // Número total de posts
//     const totalPages = response.headers.get('X-WP-TotalPages'); // Número total de páginas
//     const posts = await response.json();
    
//     // Verifica se posts é realmente um array
//     if (!Array.isArray(posts)) {
//       throw new Error('Os dados retornados não são um array de posts');
//     }
    
//     return { posts, totalPosts, totalPages };
//   } catch (error) {
//     console.error('Erro ao buscar os posts da API do WordPress:', error);
//     return { posts: [], totalPosts: 0, totalPages: 0 }; // Retorna valores padrão em caso de erro
//   }
// }
