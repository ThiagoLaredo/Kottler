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

          // Verificar se há imagem antes de definir a URL
          let imageUrl = "";
          if (item.fields.imagem && Array.isArray(item.fields.imagem) && item.fields.imagem.length > 0) {
            const image = item.fields.imagem[0]; 
            if (image.fields && image.fields.file) {
              imageUrl = `https:${image.fields.file.url}`;
            }
          }

          // Criar HTML do post apenas se houver imagem
          post.innerHTML = `
          <a href="post.html?slug=${item.fields.slug}" class="post-link">
            ${imageUrl ? `<img src="${imageUrl}" alt="${item.fields.title}" />` : ""}
            <h2>${item.fields.title}</h2>
            <p>${previewContent} <span class="read-more">Leia mais</span></p>
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

          // Atualizar título da página com prefixo fixo
          const seoTitle = `Agência Kottler: ${post.fields.seoTitle || post.fields.title}`;
          document.title = seoTitle;

          // Atualizar meta description
          const seoDescription = post.fields.seoDescription || "Descrição do post não disponível.";
          let metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute("content", seoDescription);
          } else {
            const newMetaDescription = document.createElement("meta");
            newMetaDescription.setAttribute("name", "description");
            newMetaDescription.setAttribute("content", seoDescription);
            document.head.appendChild(newMetaDescription);
          }

          // Verificar se há imagem SEO antes de definir as meta tags
          let seoImage = "";
          if (post.fields.seoImage && post.fields.seoImage.fields && post.fields.seoImage.fields.file) {
            seoImage = `https:${post.fields.seoImage.fields.file.url}`;
          }

          if (seoImage) {
            document.querySelector('meta[property="og:image"]').setAttribute("content", seoImage);
            document.querySelector('meta[name="twitter:image"]').setAttribute("content", seoImage);
            document.querySelector('meta[property="og:image:alt"]').setAttribute("content", post.fields.title || "Imagem do post");
            document.querySelector('meta[name="twitter:image:alt"]').setAttribute("content", post.fields.title || "Imagem do post");
          }

          // Definir a imagem de fundo da introdução somente se houver imagem
          let backgroundImageUrl = "";
          if (post.fields.imagem && Array.isArray(post.fields.imagem) && post.fields.imagem.length > 0) {
            const image = post.fields.imagem[0];
            if (image.fields && image.fields.file) {
              backgroundImageUrl = `https:${image.fields.file.url}`;
            }
          }

          const introducaoSection = document.querySelector(".introducao");
          if (introducaoSection) {
            if (backgroundImageUrl) {
              introducaoSection.style.backgroundImage = `url('${backgroundImageUrl}')`;
            } else {
              introducaoSection.style.backgroundImage = "none";
            }

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
