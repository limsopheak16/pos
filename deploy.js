const fs = require('fs');
const path = require('path');

// Create deployment directory
const deployDir = 'deploy';
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// Copy only necessary files from .next
const filesToCopy = [
  'static',
  'server',
  'manifest.json',
  'BUILD_ID',
  'prerender-manifest.json',
  'routes-manifest.json',
  'images-manifest.json'
];

filesToCopy.forEach(file => {
  const src = path.join('.next', file);
  const dest = path.join(deployDir, file);
  
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
    console.log(`Copied: ${file}`);
  }
});

// Copy public files
if (fs.existsSync('public')) {
  copyDir('public', path.join(deployDir, 'public'));
  console.log('Copied: public directory');
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Deployment files prepared successfully!');
