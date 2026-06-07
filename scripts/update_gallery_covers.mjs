import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace cover image paths for bt1 to bt7
content = content
  .replace(/coverImage:\s*['"]\/images\/cover_bt1\.png['"]/g, "coverImage: '/images/anh_1.png'")
  .replace(/coverImage:\s*['"]\/images\/cover_bt2\.png['"]/g, "coverImage: '/images/anh_2.png'")
  .replace(/coverImage:\s*['"]\/images\/cover_bt3\.png['"]/g, "coverImage: '/images/anh_3.png'")
  .replace(/coverImage:\s*['"]\/images\/cover_bt4\.png['"]/g, "coverImage: '/images/anh_4.png'")
  .replace(/coverImage:\s*['"]\/images\/cover_bt5\.png['"]/g, "coverImage: '/images/anh_5.png'")
  .replace(/coverImage:\s*['"]\/images\/cover_bt6\.png['"]/g, "coverImage: '/images/anh_6.png'")
  .replace(/coverImage:\s*['"]\/images\/cover_bt7\.png['"]/g, "coverImage: '/images/anh_7.jpg'");

fs.writeFileSync(filePath, content);
console.log('Successfully updated gallery cover images in App.tsx!');
