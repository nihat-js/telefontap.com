const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function addTextToImage(imagePath, outputPath, text) {
  // Load the image
  const image = await loadImage(imagePath);

  // Create a canvas with the same dimensions as the image
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  // Draw the image onto the canvas
  ctx.drawImage(image, 0, 0);

  // Set the text properties
  ctx.font = 'bold 50px Arial'; // Adjust the font size and type as needed
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // White with 50% transparency
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Position the text in the center of the image
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  // Write the canvas to a file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

// Usage
addTextToImage('input-image.png', 'output-image.png', 'telefontap.com')
  .then(() => console.log('Image processed successfully'))
  .catch(err => console.error('Error processing image:', err));
