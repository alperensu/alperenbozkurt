/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const orig = content;
      content = content.replace(/bg-white\/\s/g, 'bg-white/10 ');
      content = content.replace(/bg-white\/\"/g, 'bg-white/10"');
      content = content.replace(/border-white\/\s/g, 'border-white/10 ');
      content = content.replace(/border-white\/\"/g, 'border-white/10"');
      content = content.replace(/text-white\/\s/g, 'text-white/50 ');
      content = content.replace(/text-white\/\"/g, 'text-white/50"');
      content = content.replace(/white\/\s/g, 'white/10 ');
      if (content !== orig) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}
processDir('c:/Users/alper/Desktop/alperenbozkurt/src');
