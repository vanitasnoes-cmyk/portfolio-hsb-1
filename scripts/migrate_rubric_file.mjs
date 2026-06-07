import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/data/vnu-rubric.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace UMP and pharmaceutical references with generic/HSB equivalents
content = content
  .replace(/VNU-UMP/g, 'VNU-HSB')
  .replace(/ngành Dược/g, 'ngành Quản trị & Công nghệ')
  .replace(/ngành Dược học/g, 'ngành Quản trị & Công nghệ')
  .replace(/y dược/g, 'quản lý & công nghệ')
  .replace(/Dược khoa/g, 'khoa học & công nghệ')
  .replace(/dược lý/g, 'quản lý & công nghệ')
  .replace(/Infographic Dược/g, 'Infographic truyền thông')
  .replace(/Dược thư quốc gia/g, 'tài liệu học thuật chuyên ngành')
  .replace(/đào tạo Dược/g, 'đào tạo quản trị & công nghệ')
  .replace(/nghiên cứu Dược lâm sàng/g, 'nghiên cứu quản trị & công nghệ')
  .replace(/y khoa/g, 'học thuật khoa học')
  .replace(/nhiệm vụ \(1–6\)/g, 'nhiệm vụ (1–7)');

fs.writeFileSync(filePath, content);
console.log('Successfully updated src/data/vnu-rubric.ts!');
