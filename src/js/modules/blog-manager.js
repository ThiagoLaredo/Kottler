import { client } from "./contentful-client.js";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

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

          // Verificar se existe conteúdo no corpo (RICH TEXT)
          let previewContent = "Sem conteúdo disponível";
          if (item.fields.corpo) {
            previewContent = documentToPlainTextString(item.fields.corpo).substring(0, 150) + "...";
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
          <a href="post.html?slug=${item.fields.slug}" class="post-link">
            <div class="post-content">
              <img src="${imageUrl}" alt="${item.fields.title}" />
              <h2>${item.fields.title}</h2>
              <p>${previewContent}</p>
            </div>
          </a>
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
        include: 2, // Para carregar assets (imagens)
      })
      .then((response) => {
        if (response.items.length > 0) {
          const post = response.items[0];

          // Verificar e obter a imagem principal
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

          // Processar a galeria de imagens
          let galleryHtml = "";
          if (post.fields.galeria && post.fields.galeria.length > 0) {
            galleryHtml = `<div class="gallery-container">`;
            post.fields.galeria.forEach((image) => {
              if (image.fields && image.fields.file) {
                const imageUrl = `https:${image.fields.file.url}`;
                const altText = image.fields.title || "Imagem da galeria";
                galleryHtml += `<div class="gallery-item"><img src="${imageUrl}" alt="${altText}" /></div>`;
              }
            });
            galleryHtml += `</div>`;
          }

          // Atualizar o conteúdo do post
          if (postContainer) {
            postContainer.innerHTML = `
              ${formattedBody}
              ${galleryHtml}
              <a class="voltar-blog" href="blog">Voltar ao Blog</a>
            `;
          }
        } else {
          postContainer.innerHTML = `
            <p>Post não encontrado.</p>
            <a class="voltar-blog" href="blog">Voltar ao Blog</a>
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
