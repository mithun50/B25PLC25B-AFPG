const fs = require('fs');
const path = require('path');

const imgPath = 'dblogo.png';
const htmlPath = 'index.html';
const templatePath = 'Front-page-template.html';

try {
  // Read the image and convert to base64
  const b64 = fs.readFileSync(imgPath).toString('base64');
  const dataUri = `data:image/png;base64,${b64}`;

  // Replace in both files
  [htmlPath, templatePath].forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let html = fs.readFileSync(filePath, 'utf8');
      html = html.replace(/src="dblogo\.png"/g, `src="${dataUri}"`);
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`Success: embedded logo into ${filePath}`);
    }
  });

  console.log('\nDone! Please refresh your index.html in the browser and try exporting again.');
} catch (e) {
  console.error('Error:', e.message);
  console.error('Make sure dblogo.png exists in this folder!');
}
