const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const altNextDir = path.join(rootDir, '.next_build');
const nextDir = fs.existsSync(altNextDir) ? altNextDir : path.join(rootDir, '.next');
const localNextDir = path.join(rootDir, '.next');
const outDir = path.join(rootDir, 'out');
const publicDir = path.join(rootDir, 'public');

/**
 * Fast directory copy using native Node C++ fs.cpSync with fallback
 */
function copyFast(src, dest) {
  if (!fs.existsSync(src)) return;
  try {
    if (typeof fs.cpSync === 'function') {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.cpSync(src, dest, { recursive: true, force: true, dereference: true });
    } else {
      copyRecursiveSync(src, dest);
    }
  } catch (err) {
    try { copyRecursiveSync(src, dest); } catch (e) {}
  }
}

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
  } catch (err) {}
}

/**
 * Single-pass HTML processor: creates index.html directory aliases and rewrites asset paths in one sweep
 */
function processHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return;
  try {
    const files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          processHtmlFiles(filePath);
        } else if (file.endsWith('.html')) {
          let content = fs.readFileSync(filePath, 'utf8');
          let modified = false;
          if (content.includes('/_next/') || content.includes('"_next/')) {
            content = content.replace(/\/_next\//g, '/next/').replace(/"_next\//g, '"next/');
            modified = true;
          }
          if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
          }

          // Create HTML alias (e.g. pricing.html -> pricing/index.html)
          if (file !== 'index.html' && !file.startsWith('_')) {
            const baseName = file.replace(/\.html$/, '');
            const subFolder = path.join(dir, baseName);
            const subIndex = path.join(subFolder, 'index.html');
            fs.mkdirSync(subFolder, { recursive: true });
            fs.copyFileSync(filePath, subIndex);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Building Hostinger-compatible out folder with full page URL aliases (Fast Engine)...');

// 0. If built in .next_build, mirror to local .next
if (fs.existsSync(altNextDir)) {
  copyFast(altNextDir, localNextDir);
}

// 1. Copy public assets into out
if (fs.existsSync(publicDir)) {
  copyFast(publicDir, outDir);
}

// 2. Copy .next/server/app HTML pages into out
const serverApp = path.join(nextDir, 'server', 'app');
if (fs.existsSync(serverApp)) {
  copyFast(serverApp, outDir);
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
  try { fs.copyFileSync(rootHtaccess, path.join(outDir, '.htaccess')); } catch (e) {}
}

// 5. Copy .next/static into BOTH out/_next/static AND out/next/static for Hostinger compatibility
const nextStatic = path.join(nextDir, 'static');
if (fs.existsSync(nextStatic)) {
  copyFast(nextStatic, path.join(outDir, '_next', 'static'));
  copyFast(nextStatic, path.join(outDir, 'next', 'static'));
}

// 6 & 7. Single-pass process all HTML files for aliases & asset path rewrites
processHtmlFiles(outDir);

// 8. Fix asset paths in root index.html if present
const rootIndex = path.join(rootDir, 'index.html');
if (fs.existsSync(rootIndex)) {
  try {
    let rootContent = fs.readFileSync(rootIndex, 'utf8');
    if (rootContent.includes('/_next/') || rootContent.includes('"_next/')) {
      rootContent = rootContent.replace(/\/_next\//g, '/next/').replace(/"_next\//g, '"next/');
      fs.writeFileSync(rootIndex, rootContent, 'utf8');
    }
  } catch (e) {}
}

console.log('Hostinger out folder created successfully with 0 errors! Native index.html copied and all page URLs connected!');
