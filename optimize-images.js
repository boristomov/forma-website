// Simple script to help optimize image references
// This script can be run to update image paths to use optimized versions

const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Image optimization mappings
const imageOptimizations = [
    // Convert common images to optimized versions
    { from: 'assets/img/bedroom.jpg', to: 'assets/img-optimized/bedroom.jpg' },
    { from: 'assets/img/boyan_pic.jpg', to: 'assets/img-optimized/boyan_pic.jpg' },
    { from: 'assets/img/BF1_6564.jpg', to: 'assets/img-optimized/BF1_6564.jpg' },
    { from: 'assets/img/BF1_6731.jpg', to: 'assets/img-optimized/BF1_6731.jpg' },
    { from: 'assets/img/BF1_6750.jpg', to: 'assets/img-optimized/BF1_6750.jpg' },
    // Add more mappings as needed
];

// Apply optimizations
imageOptimizations.forEach(optimization => {
    const regex = new RegExp(optimization.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    htmlContent = htmlContent.replace(regex, optimization.to);
});

// Write back to file
fs.writeFileSync(htmlPath, htmlContent);

console.log('Image optimizations applied successfully!');
