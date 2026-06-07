import fs from 'fs';
import path from 'path';

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';
const componentsDir = path.join(workspaceRoot, 'src/components');

function scanAndMigrate(dir) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanAndMigrate(fullPath);
    } else {
      const ext = path.extname(f).toLowerCase();
      if (['.tsx', '.ts'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Replacements of hardcoded colors
        content = content
          .replace(/#0284c7/g, '#ea580c')
          .replace(/#0ea5e9/g, '#f97316')
          .replace(/#bae6fd/g, '#fed7aa')
          .replace(/#f0f9ff/g, '#ffedd5')
          .replace(/#0369a1/g, '#c2410c')
          .replace(/#071530/g, '#180b02')
          
          // Tailwind sky/blue replacements
          .replace(/text-sky-600/g, 'text-orange-600')
          .replace(/text-sky-700/g, 'text-orange-700')
          .replace(/dark:text-sky-300/g, 'dark:text-orange-300')
          .replace(/dark:text-sky-400/g, 'dark:text-orange-400')
          .replace(/border-sky-200/g, 'border-orange-200')
          .replace(/bg-sky-50/g, 'bg-orange-50')
          .replace(/border-sky-100/g, 'border-orange-100')
          
          // Tailwind indigo/teal replacements to orange/amber
          .replace(/bg-indigo-50/g, 'bg-orange-50')
          .replace(/bg-indigo-100/g, 'bg-orange-100')
          .replace(/bg-indigo-600/g, 'bg-orange-600')
          .replace(/bg-indigo-700/g, 'bg-orange-700')
          .replace(/bg-indigo-800/g, 'bg-orange-800')
          .replace(/bg-indigo-900/g, 'bg-orange-900')
          .replace(/dark:bg-indigo-950\/50/g, 'dark:bg-orange-950/50')
          .replace(/dark:bg-indigo-950\/30/g, 'dark:bg-orange-950/30')
          .replace(/text-indigo-500/g, 'text-orange-500')
          .replace(/text-indigo-600/g, 'text-orange-600')
          .replace(/text-indigo-700/g, 'text-orange-700')
          .replace(/text-indigo-800/g, 'text-orange-800')
          .replace(/text-indigo-900/g, 'text-orange-900')
          .replace(/text-indigo-950/g, 'text-orange-950')
          .replace(/dark:text-indigo-200/g, 'dark:text-orange-200')
          .replace(/dark:text-indigo-300/g, 'dark:text-orange-300')
          .replace(/dark:text-indigo-400/g, 'dark:text-orange-400')
          .replace(/border-indigo-100/g, 'border-orange-100')
          .replace(/border-indigo-200/g, 'border-orange-200')
          .replace(/border-indigo-300/g, 'border-orange-300')
          .replace(/border-indigo-400/g, 'border-orange-400')
          .replace(/border-indigo-50/g, 'border-orange-50')
          .replace(/hover:bg-indigo-50/g, 'hover:bg-orange-50')
          .replace(/bg-indigo-950/g, 'bg-orange-950')
          .replace(/text-indigo-700/g, 'text-orange-700')
          .replace(/glass-panel-indigo/g, 'glass-panel')
          .replace(/text-indigo-900/g, 'text-orange-900')
          
          // UMP to HSB Logo string replacements
          .replace(/vnu-ump-logo\.png/g, 'hsb-logo.png')
          .replace(/alt="Logo VNU-UMP"/g, 'alt="Logo VNU-HSB"')
          
          // Blue text and backgrounds in dark mode
          .replace(/dark:bg-\[#071530\]/g, "dark:bg-[#180b02]")
          .replace(/dark:border-sky-900/g, "dark:border-orange-900")
          .replace(/dark:text-sky-300/g, "dark:text-orange-300");

        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

scanAndMigrate(componentsDir);
console.log('Successfully migrated all components to orange/amber colors!');
