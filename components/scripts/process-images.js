// components/scripts/process-images.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images/presidents';
const outputDir = 'public/images/presidents/processed';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

async function processImage(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .resize({
                width: 500,
                height: 500,
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .webp({ quality: 80 })
            .toFile(outputPath);
        
        console.log(`Processed: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`Error processing ${inputPath}:`, error);
    }
}

async function processAllImages() {
    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);
            await processImage(inputPath, outputPath);
        }
    }
}
processAllImages();
