import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/index.css';
let content = fs.readFileSync(filePath, 'utf8');

// Color mapping replacements
const replacements = [
  { from: /#0284c7/g, to: '#ea580c' }, // primary light mode orange
  { from: /#bae6fd/g, to: '#fed7aa' }, // light orange / peach
  { from: /#0ea5e9/g, to: '#f97316' }, // bright orange accent
  { from: /#38bdf8/g, to: '#ff8000' }, // primary dark mode orange
  { from: /#031e30/g, to: '#120902' }, // dark background
  { from: /#075985/g, to: '#451a03' }, // dark secondary
  { from: /#072b44/g, to: '#271408' }, // dark panel bg
  { from: /#0c4a6e/g, to: '#3a1c02' }, // dark panel bg 2
  { from: /#f0f9ff/g, to: '#ffedd5' }, // soft peach
  { from: /#0369a1/g, to: '#c2410c' }, // dark hover orange
  { from: /#071530/g, to: '#180b02' }, // dark stat card bg
  { from: /#030d1a/g, to: '#0d0501' }, // dark footer bg
  { from: /rgba\(2,\s*132,\s*199/g, to: 'rgba(234, 88, 12' },
  { from: /rgba\(56,\s*189,\s*248/g, to: 'rgba(255, 128, 0' }
];

// Special adjustment for body text color in light mode (so it's a readable dark warm brown instead of bright orange)
content = content.replace('color: #0284c7;', 'color: #2b1405;');

for (const rep of replacements) {
  content = content.replace(rep.from, rep.to);
}

fs.writeFileSync(filePath, content);
console.log('Successfully migrated index.css to tangerine orange color theme!');
