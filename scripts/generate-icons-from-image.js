const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Función para crear icono desde imagen
async function createIconFromImage(imagePath, outputPath, size) {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fondo con gradiente del tema
  const bgGradient = ctx.createLinearGradient(0, 0, size, size);
  bgGradient.addColorStop(0, '#1e1b4b');
  bgGradient.addColorStop(0.5, '#312e81');
  bgGradient.addColorStop(1, '#4c1d95');
  ctx.fillStyle = bgGradient;
  ctx.roundRect(0, 0, size, size, size * 0.25);
  ctx.fill();
  
  // Calcular dimensiones para mantener aspecto y centrar con padding
  const padding = size * 0.1; // 10% de padding
  const maxWidth = size - (padding * 2);
  const maxHeight = size - (padding * 2);
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;
  const x = (size - scaledWidth) / 2;
  const y = (size - scaledHeight) / 2;
  
  // Sombra sutil para el logo
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = size * 0.02;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = size * 0.01;
  
  // Dibujar imagen centrada
  ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
  
  // Resetear sombra
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Guardar
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

// Función para crear splash screen desde imagen
async function createSplashFromImage(imagePath, outputPath, width, height) {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fondo con gradiente radial del tema
  const bgGradient = ctx.createRadialGradient(
    width * 0.3,
    height * 0.3,
    0,
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.8
  );
  bgGradient.addColorStop(0, '#0f172a');
  bgGradient.addColorStop(0.3, '#1e1b4b');
  bgGradient.addColorStop(0.6, '#312e81');
  bgGradient.addColorStop(1, '#4c1d95');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Calcular tamaño del logo (40% del tamaño menor)
  const logoMaxSize = Math.min(width, height) * 0.4;
  const scale = Math.min(logoMaxSize / image.width, logoMaxSize / image.height);
  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;
  const x = (width - scaledWidth) / 2;
  const y = (height - scaledHeight) / 2 - height * 0.08; // Ligeramente arriba del centro
  
  // Sombra para el logo
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = width * 0.02;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = width * 0.01;
  
  // Dibujar logo
  ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
  
  // Resetear sombra
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Texto "IMPOSTOR" debajo del logo con efecto glitch sutil
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = width * 0.01;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = width * 0.005;
  
  const textGradient = ctx.createLinearGradient(
    width * 0.2,
    y + scaledHeight + height * 0.08,
    width * 0.8,
    y + scaledHeight + height * 0.08
  );
  textGradient.addColorStop(0, '#ffffff');
  textGradient.addColorStop(0.5, '#e0e7ff');
  textGradient.addColorStop(1, '#ffffff');
  
  ctx.fillStyle = textGradient;
  ctx.font = `bold ${width * 0.08}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = width * 0.008;
  
  // Efecto glitch sutil (dibujar texto con pequeño offset en rojo/azul)
  ctx.fillStyle = 'rgba(220, 38, 38, 0.3)';
  ctx.fillText('IMPOSTOR', width / 2 + width * 0.003, y + scaledHeight + height * 0.08);
  ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
  ctx.fillText('IMPOSTOR', width / 2 - width * 0.003, y + scaledHeight + height * 0.08);
  ctx.fillStyle = textGradient;
  ctx.fillText('IMPOSTOR', width / 2, y + scaledHeight + height * 0.08);
  
  // Subtítulo
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = width * 0.005;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = `${width * 0.03}px Arial`;
  ctx.letterSpacing = width * 0.003;
  ctx.fillText('El juego de las palabras', width / 2, y + scaledHeight + height * 0.13);
  
  // Guardar
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

// Función principal
async function generateIcons() {
  const assetsDir = path.join(__dirname, '..', 'assets', 'images');
  const rootDir = path.join(__dirname, '..');
  
  // Asegurar que el directorio existe
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  // Buscar la imagen del logo en diferentes ubicaciones posibles
  const possiblePaths = [
    path.join(rootDir, 'logo.png'),
    path.join(rootDir, 'logo.jpg'),
    path.join(assetsDir, 'logo.png'),
    path.join(assetsDir, 'logo.jpg'),
    path.join(assetsDir, 'splash_logo.png'), // Por si ya existe
    path.join(rootDir, 'temp-logo.png'),
  ];
  
  let imagePath = null;
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      imagePath = possiblePath;
      console.log(`Encontrada imagen en: ${imagePath}`);
      break;
    }
  }
  
  if (!imagePath) {
    console.log('❌ No se encontró la imagen del logo.');
    console.log('\nPor favor, coloca la imagen del logo en una de estas ubicaciones:');
    console.log('  - logo.png (en la raíz del proyecto)');
    console.log('  - assets/images/logo.png');
    console.log('  - O proporciona la ruta como argumento: node scripts/generate-icons-from-image.js <ruta-a-imagen>');
    process.exit(1);
  }
  
  console.log('🎨 Generando iconos desde la imagen...\n');
  
  try {
    // 1. Icono principal (1024x1024)
    console.log('📱 Generando icon.png (1024x1024)...');
    await createIconFromImage(imagePath, path.join(assetsDir, 'icon.png'), 1024);
    
    // 2. Icono adaptativo para Android (1024x1024)
    console.log('🤖 Generando adaptive-icon.png (1024x1024)...');
    await createIconFromImage(imagePath, path.join(assetsDir, 'adaptive-icon.png'), 1024);
    
    // 3. Splash screen (1284x2778)
    console.log('🌅 Generando splash-icon.png (1284x2778)...');
    await createSplashFromImage(imagePath, path.join(assetsDir, 'splash-icon.png'), 1284, 2778);
    
    // 4. Favicon (32x32)
    console.log('🌐 Generando favicon.png (32x32)...');
    await createIconFromImage(imagePath, path.join(assetsDir, 'favicon.png'), 32);
    
    console.log('\n✅ ¡Iconos generados exitosamente!');
    console.log('\nLos archivos se han guardado en: assets/images/');
  } catch (error) {
    console.error('❌ Error al generar los iconos:', error.message);
    process.exit(1);
  }
}

// Ejecutar
const args = process.argv.slice(2);
if (args.length > 0) {
  // Si se proporciona una ruta como argumento
  const imagePath = args[0];
  if (fs.existsSync(imagePath)) {
    const tempPath = path.join(__dirname, '..', 'temp-logo.png');
    fs.copyFileSync(imagePath, tempPath);
    generateIcons().catch(console.error);
  } else {
    console.error('❌ La imagen no existe en la ruta proporcionada:', imagePath);
    process.exit(1);
  }
} else {
  generateIcons().catch(console.error);
}
