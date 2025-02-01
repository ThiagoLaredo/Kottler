import { client } from "./contentful-client.js";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export class BlogManager {
  constructor() {}

  // Carregar a lista de posts
  loadPosts() {
    const postsContainer = document.getElementById("posts");

    client
      .getEntries({ content_type: "projeto" })
      .then((response) => {
        response.items.forEach((item) => {
          const post = document.createElement("div");
          post.className = "post-preview";

          // Verificar se existe conteúdo no corpo
          let previewContent = "Sem conteúdo disponível";
          if (item.fields.body) {
            previewContent =
              documentToHtmlString(item.fields.body).substring(0, 150) + "...";
          }

          // Verificar e obter a imagem
          let imageUrl = "";
          if (item.fields.imagem) {
            const images = Array.isArray(item.fields.imagem) ? item.fields.imagem : [item.fields.imagem];
            if (images[0].fields && images[0].fields.file) {
              imageUrl = `https:${images[0].fields.file.url}`;
            }
          }

          if (!imageUrl) {
            imageUrl = "caminho/para/imagem/fallback.jpg"; // Imagem de fallback
          }

          post.innerHTML = `
            <img src="${imageUrl}" alt="${item.fields.title}" />
            <h2>${item.fields.title}</h2>
            <p>${previewContent}</p>
            <a href="post.html?slug=${item.fields.slug}">Leia mais</a>
          `;
          postsContainer.appendChild(post);
        });
      })
      .catch((err) => console.error("Erro ao carregar posts:", err));
  }

  // Carregar um post individual
  loadPost() {
    const postContainer = document.getElementById("post-container");
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    client
      .getEntries({
        content_type: "projeto",
        "fields.slug": slug,
      })
      .then((response) => {
        if (response.items.length > 0) {
          const post = response.items[0];

          // Verificar e obter a imagem
          let backgroundImageUrl = "";
          if (post.fields.imagem) {
            const images = Array.isArray(post.fields.imagem) ? post.fields.imagem : [post.fields.imagem];
            if (images[0].fields && images[0].fields.file) {
              backgroundImageUrl = `https:${images[0].fields.file.url}`;
            }
          }

          // Atualizar a introdução
          const introducaoSection = document.querySelector(".introducao");
          if (introducaoSection) {
            introducaoSection.style.backgroundImage = `url('${backgroundImageUrl}')`;

            const tituloElement = introducaoSection.querySelector("h1");
            if (tituloElement) {
              tituloElement.textContent = post.fields.title;
            }
          }

          // Converter Rich Text para HTML
          const richTextContent = post.fields.corpo;
          const formattedBody = richTextContent ? documentToHtmlString(richTextContent) : "<p>Conteúdo não disponível.</p>";

          // Atualizar o conteúdo do post
          if (postContainer) {
            postContainer.innerHTML = `
              ${formattedBody}
              <a class="voltar-blog" href="blog.html">Voltar ao Blog</a>
            `;
          }
        } else {
          postContainer.innerHTML = `
            <p>Post não encontrado.</p>
            <a class="voltar-blog" href="blog.html">Voltar ao Blog</a>
          `;
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar o post:", err);
        postContainer.innerHTML = `
          <p>Erro ao carregar o post. Tente novamente mais tarde.</p>
          <a class="voltar-blog" href="blog.html">Voltar ao Blog</a>
        `;
      });
  }
}




// export class BlogManager {
//   constructor() {}

//   // Carregar a lista de posts
//   loadPosts() {
//     const postsContainer = document.getElementById("posts");

//     client
//       .getEntries({ content_type: "projeto" })
//       .then((response) => {
//         response.items.forEach((item) => {
//           const post = document.createElement("div");
//           post.className = "post-preview";
//           const previewContent = item.fields.body.substring(0, 150) + "...";

//           // Verificar se a imagem existe e pegar a primeira imagem caso seja um array
//           let imageUrl = '';
//           if (item.fields.imagem) {
//             // Se for um array (múltiplas imagens), use a primeira
//             const images = Array.isArray(item.fields.imagem) ? item.fields.imagem : [item.fields.imagem];
//             if (images[0].fields && images[0].fields.file) {
//               imageUrl = `https:${images[0].fields.file.url}`;
//             }
//           }

//           if (!imageUrl) {
//             imageUrl = 'caminho/para/imagem/fallback.jpg'; // Substitua pelo caminho da sua imagem de fallback
//           }

//           post.innerHTML = `
//             <img src="${imageUrl}" alt="${item.fields.title}" />
//             <h2>${item.fields.title}</h2>
//             <p>${previewContent}</p>
//             <a href="post.html?slug=${item.fields.slug}">Leia mais</a>
//           `;
//           postsContainer.appendChild(post);
//         });
//       })
//       .catch((err) => console.error("Erro ao carregar posts:", err));
//   }


// // Carregar um post individual
// loadPost() {
//     const postContainer = document.getElementById("post-container");
//     const params = new URLSearchParams(window.location.search);
//     const slug = params.get("slug");

//     client
//       .getEntries({
//         content_type: "projeto", // Certifique-se de que o 'content_type' está correto
//         "fields.slug": slug,
//       })
//       .then((response) => {
//         if (response.items.length > 0) {
//           const post = response.items[0];

//           // Verificar se a imagem existe e pegar a primeira imagem caso seja um array
//           let backgroundImageUrl = '';
//           if (post.fields.imagem) {
//             const images = Array.isArray(post.fields.imagem) ? post.fields.imagem : [post.fields.imagem];
//             if (images[0].fields && images[0].fields.file) {
//               backgroundImageUrl = `https:${images[0].fields.file.url}`;
//             }
//           }

//           // Atualizar o conteúdo da seção de introdução
//           const introducaoSection = document.querySelector(".introducao");
//           if (introducaoSection) {
//             introducaoSection.style.backgroundImage = `url('${backgroundImageUrl}')`;

//             const tituloElement = introducaoSection.querySelector("h1");
//             if (tituloElement) {
//               tituloElement.textContent = post.fields.title;
//             }
//           }

//           // Atualizar o conteúdo do post
//           if (postContainer) {
//             postContainer.innerHTML = `
//               <p>${post.fields.body}</p>
//               <a class="voltar-blog" href="blog.html">Voltar ao Blog</a>
//             `;
//           }
//         } else {
//           postContainer.innerHTML = `
//             <p>Post não encontrado.</p>
//             <a class="voltar-blog" href="blog.html">Voltar ao Blog</a>
//           `;
//         }
//       })
//       .catch((err) => {
//         console.error("Erro ao carregar o post:", err);
//         postContainer.innerHTML = `
//           <p>Erro ao carregar o post. Tente novamente mais tarde.</p>
//           <a class="voltar-blog" href="blog.html">Voltar ao Blog</a>
//         `;
//       });
//   }
// }