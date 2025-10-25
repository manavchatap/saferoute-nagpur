const fs = require('fs');
const path = require('path');

const componentsDir = './src/components';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove all emojis and broken characters
  content = content.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
  content = content.replace(/[\u{2600}-\u{26FF}]/gu, '');
  content = content.replace(/[\u{2700}-\u{27BF}]/gu, '');
  content = content.replace(/[\u{FE00}-\u{FE0F}]/gu, '');
  content = content.replace(/[\u{1F900}-\u{1F9FF}]/gu, '');
  content = content.replace(/[\u{1F600}-\u{1F64F}]/gu, '');
  content = content.replace(/[\u{1F680}-\u{1F6FF}]/gu, '');
  content = content.replace(/[\uFFFD]/gu, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned: ${file}`);
});

console.log('All emojis removed!');
