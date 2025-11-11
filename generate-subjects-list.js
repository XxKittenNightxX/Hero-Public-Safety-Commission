// Node.js script to scan subjects folder and generate subjects.json
const fs = require('fs');
const path = require('path');

const subjectsDir = path.join(__dirname, 'subjects');
const outputFile = path.join(__dirname, 'subjects.json');

// Read all files in the subjects directory
fs.readdir(subjectsDir, (err, files) => {
  if (err) {
    console.error('Error reading subjects directory:', err);
    process.exit(1);
  }

  const subjects = [];

  files.forEach(file => {
    // Match pattern: subject-[ID]-[Name].html
    const match = file.match(/^subject-(\d+)-(.+)\.html$/);
    if (match) {
      const id = parseInt(match[1], 10);
      const name = match[2].replace(/-/g, ' '); // Replace hyphens with spaces
      subjects.push({ id, name });
    }
  });

  // Sort by ID
  subjects.sort((a, b) => a.id - b.id);

  // Write to JSON file
  fs.writeFile(outputFile, JSON.stringify(subjects, null, 2), (err) => {
    if (err) {
      console.error('Error writing subjects.json:', err);
      process.exit(1);
    }
    console.log(`✓ Generated subjects.json with ${subjects.length} subjects`);
  });
});
