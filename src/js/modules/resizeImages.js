import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Obtendo o diretório atual usando import.meta.url
const inputDir = path.join(new URL('.', import.meta.url).pathname, '../../img/cases');
const outputDir = path.join(inputDir, 'optimized');

// Verifica se o diretório de saída existe, caso contrário, cria
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Função para redimensionar as imagens
const resizeImages = async () => {
  const caseFolders = fs.readdirSync(inputDir);

  for (let folder of caseFolders) {
    const caseFolderPath = path.join(inputDir, folder);
    
    if (fs.statSync(caseFolderPath).isDirectory()) {
      const images = fs.readdirSync(caseFolderPath).filter(file => /\.(jpe?g|png|webp)$/i.test(file));

      for (let image of images) {
        const imagePath = path.join(caseFolderPath, image);
        const outputImageDir = path.join(outputDir, folder);
        
        if (!fs.existsSync(outputImageDir)) {
          fs.mkdirSync(outputImageDir, { recursive: true });
        }

        const imageName = path.basename(image, path.extname(image));
        
        // Redimensionando a imagem para diferentes tamanhos
        await sharp(imagePath)
          .resize(480) // Tamanho mobile
          .toFile(path.join(outputImageDir, `${imageName}-480w.webp`));

        await sharp(imagePath)
          .resize(1024) // Tamanho desktop
          .toFile(path.join(outputImageDir, `${imageName}-1024w.webp`));

        await sharp(imagePath)
          .resize(2000) // Tamanho large
          .toFile(path.join(outputImageDir, `${imageName}-2000w.webp`));

        console.log(`Imagens otimizadas para o case ${folder}: ${image}`);
      }
    }
  }
};

resizeImages().catch(err => console.error('Erro ao redimensionar imagens:', err));
