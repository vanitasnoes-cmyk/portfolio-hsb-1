import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/components/RubricSupplements.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace UMP and student references
content = content
  .replace(/NguyenTungDuong/g, 'DaoThiKhanhHuyen')
  .replace(/Nguyễn Tùng Dương/g, 'Đào Thị Khánh Huyền')
  .replace(/\(y khoa\)/g, '(học thuật)')
  .replace(/VNU-UMP/g, 'VNU-HSB');

fs.writeFileSync(filePath, content);
console.log('Successfully updated src/components/RubricSupplements.tsx!');
