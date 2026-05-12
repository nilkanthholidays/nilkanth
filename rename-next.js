const fs = require('fs');
const path = require('path');

// Rename _next to next to bypass Jekyll's underscore filtering
const oldPath = path.join(__dirname, 'out', '_next');
const newPath = path.join(__dirname, 'out', 'next');

console.log('Renaming _next to next...');
console.log('Old path:', oldPath);
console.log('New path:', newPath);

try {
  if (fs.existsSync(oldPath)) {
    // Remove destination if it exists
    if (fs.existsSync(newPath)) {
      fs.rmSync(newPath, { recursive: true, force: true });
    }
    
    fs.renameSync(oldPath, newPath);
    console.log('✓ Successfully renamed _next to next');
    
    // Update HTML files to reference new path
    const indexPath = path.join(__dirname, 'out', 'index.html');
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, 'utf8');
      content = content.replace(/_next\//g, 'next/');
      fs.writeFileSync(indexPath, content);
      console.log('✓ Updated index.html references');
    }
  } else {
    console.log('⚠ _next directory not found');
  }
} catch (error) {
  console.error('✗ Error renaming directory:', error.message);
  process.exit(1);
}
