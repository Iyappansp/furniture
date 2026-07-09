const fs = require('fs');
const path = require('path');

function getFiles(dir, files_ = []) {
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

const allImages = getFiles('assets/images').map(f => f.replace(/\\/g, '/'));
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const referencedImages = new Set();
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /src=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    referencedImages.add(match[1]);
  }
});

console.log('--- Unused Images in assets/images ---');
let unusedCount = 0;
allImages.forEach(img => {
  if (!referencedImages.has(img) && !img.includes('logo') && !img.includes('fav')) {
    console.log(img);
    unusedCount++;
  }
});
console.log(`Total unused images: ${unusedCount}`);
