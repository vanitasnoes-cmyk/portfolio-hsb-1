import fs from 'fs';
import path from 'path';

const filePath = 'C:/Users/USER/.gemini/antigravity/brain/77c25206-aa4e-46ee-a2d3-361d6e268ed4/.system_generated/steps/160/content.md';
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const urls = [];
  
  // Find all markdown images or links that contain logo
  const regex = /!\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match[1].toLowerCase().includes('logo')) {
      urls.push(match[1]);
    }
  }
  
  // Also scan for raw http/https URLs containing logo and image extensions
  const rawRegex = /(https?:\/\/[^\s\)\"]+?logo[^\s\)\"]+?\.(?:png|jpg|jpeg|svg|gif))/gi;
  while ((match = rawRegex.exec(content)) !== null) {
    if (!urls.includes(match[1])) {
      urls.push(match[1]);
    }
  }
  
  console.log("Found logo URLs:");
  console.log(urls.join('\n'));
} else {
  console.log("File not found.");
}
