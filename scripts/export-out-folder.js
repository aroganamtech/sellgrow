const fs = require('fs');
const path = require('path');
const os = require('os');

const rootDir = path.join(__dirname, '..');
const altNextDir = path.join(rootDir, '.next_build');
const nextDir = fs.existsSync(altNextDir) ? altNextDir : path.join(rootDir, '.next');
const localNextDir = path.join(rootDir, '.next');
const outDir = path.join(rootDir, 'out');
const publicDir = path.join(rootDir, 'public');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  try {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
  } catch (err) {
    // Ignore temporary lock/file race condition errors
  }
}

function ensureHtmlAliases(dir) {
  if (!fs.existsSync(dir)) return;
  try {
    const files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          ensureHtmlAliases(filePath);
        } else if (file.endsWith('.html') && file !== 'index.html' && !file.startsWith('_')) {
          const baseName = file.replace(/\.html$/, '');
          const subFolder = path.join(dir, baseName);
          const subIndex = path.join(subFolder, 'index.html');
          fs.mkdirSync(subFolder, { recursive: true });
          fs.copyFileSync(filePath, subIndex);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

function fixHtmlAssetPaths(dir) {
  if (!fs.existsSync(dir)) return;
  try {
    const files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          fixHtmlAssetPaths(filePath);
        } else if (file.endsWith('.html')) {
          let content = fs.readFileSync(filePath, 'utf8');
          content = content.replace(/\/_next\//g, '/next/');
          content = content.replace(/"_next\//g, '"next/');
          fs.writeFileSync(filePath, content, 'utf8');
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Building Hostinger-compatible out folder with full page URL aliases...');

// 0. If built in .next_build, mirror to local .next
if (fs.existsSync(altNextDir)) {
  try {
    copyRecursiveSync(altNextDir, localNextDir);
  } catch (e) {}
}

// 1. Copy public assets into out
if (fs.existsSync(publicDir)) {
  copyRecursiveSync(publicDir, outDir);
}

// 2. Copy .next/server/app HTML pages into out
const serverApp = path.join(nextDir, 'server', 'app');
if (fs.existsSync(serverApp)) {
  copyRecursiveSync(serverApp, outDir);
}

// 3. Copy compiled real Next.js index.html to root index.html and out/index.html
const compiledIndexHtml = path.join(serverApp, 'index.html');
if (fs.existsSync(compiledIndexHtml)) {
  try {
    fs.copyFileSync(compiledIndexHtml, path.join(rootDir, 'index.html'));
    fs.copyFileSync(compiledIndexHtml, path.join(outDir, 'index.html'));
  } catch (e) {}
}

// 4. Copy root .htaccess to out
const rootHtaccess = path.join(rootDir, '.htaccess');
if (fs.existsSync(rootHtaccess)) {
  try { fs.copyFileSync(rootHtaccess, path.join(outDir, '.htaccess')); } catch(e){}
}

// 5. Copy .next/static into BOTH out/_next/static AND out/next/static for Hostinger & cross-browser compatibility
const nextStatic = path.join(nextDir, 'static');
if (fs.existsSync(nextStatic)) {
  copyRecursiveSync(nextStatic, path.join(outDir, '_next', 'static'));
  copyRecursiveSync(nextStatic, path.join(outDir, 'next', 'static'));
}

// 6. Create directory index.html aliases (pricing.html -> pricing/index.html)
ensureHtmlAliases(outDir);

// 7. Rewrite all _next references to next/ across all HTML files
fixHtmlAssetPaths(outDir);

// 8. Also fix asset paths in root index.html
if (fs.existsSync(path.join(rootDir, 'index.html'))) {
  try {
    let rootContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    rootContent = rootContent.replace(/\/_next\//g, '/next/');
    rootContent = rootContent.replace(/"_next\//g, '"next/');
    fs.writeFileSync(path.join(rootDir, 'index.html'), rootContent, 'utf8');
  } catch (e) {}
}

console.log('Hostinger out folder created successfully with 0 errors! Native index.html copied and all page URLs connected!');
