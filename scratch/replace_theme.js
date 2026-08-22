const fs = require('fs');
const path = require('path');

const DIRECTORIES = [
  path.join(__dirname, '../client/src/pages'),
  path.join(__dirname, '../client/src/layouts'),
  path.join(__dirname, '../client/src/components')
];

const REPLACEMENTS = [
  { regex: /\bbg-trade-dark\b/g, replacement: 'bg-primary-bg' },
  { regex: /\bbg-trade-card\b/g, replacement: 'bg-primary-card' },
  { regex: /\bbg-gray-900\b/g, replacement: 'bg-primary-bg' },
  { regex: /\bbg-gray-800\b/g, replacement: 'bg-primary-card' },
  { regex: /\bborder-trade-border\b/g, replacement: 'border-primary-border' },
  { regex: /\bborder-gray-700\b/g, replacement: 'border-primary-border' },
  { regex: /\bborder-gray-800\b/g, replacement: 'border-primary-border' },
  { regex: /\btext-white\b/g, replacement: 'text-primary-text' },
  { regex: /\btext-gray-100\b/g, replacement: 'text-primary-text' },
  { regex: /\btext-gray-300\b/g, replacement: 'text-primary-textMuted' },
  { regex: /\btext-gray-400\b/g, replacement: 'text-primary-textMuted' },
  { regex: /\btext-gray-500\b/g, replacement: 'text-primary-textMuted' }
];

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  REPLACEMENTS.forEach(({ regex, replacement }) => {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

console.log('Starting theme refactor...');
DIRECTORIES.forEach(dir => processDirectory(dir));
console.log('Done.');
