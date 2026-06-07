import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  isArray: (name) => ['p', 'r', 't', 'blip', 'imagedata'].includes(name),
});

const docxFiles = [
  { id: 'bt1', name: 'Bài 1 hsb.docx' },
  { id: 'bt2', name: 'Bài 2 hsb.docx' },
  { id: 'bt3', name: 'Bài 3 hsb.docx' },
  { id: 'bt4', name: 'Bài 4  hsb.docx' }, // double space
  { id: 'bt5', name: 'Bài 5 hsb.docx' },
  { id: 'bt6', name: 'Bài 6 hsb.docx' },
  { id: 'bt7', name: 'Bài 7 hsb.docx' }
];

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';

function asArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function collectText(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(collectText).join('');
  if (typeof node === 'object') {
    if (node.t != null) return collectText(node.t);
    let s = '';
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('@_')) continue;
      s += collectText(v);
    }
    return s;
  }
  return '';
}

// Recursively find any values that match relationship IDs in the paragraph
function findRIds(node, relsKeys, out = []) {
  if (node == null) return out;
  if (typeof node === 'string') {
    if (relsKeys.has(node) && !out.includes(node)) {
      out.push(node);
    }
    return out;
  }
  if (Array.isArray(node)) {
    for (const item of node) findRIds(item, relsKeys, out);
    return out;
  }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      // Check attributes starting with @_ (e.g. @_embed, @_id, @_r:id)
      if (k.startsWith('@_') && typeof v === 'string') {
        if (relsKeys.has(v) && !out.includes(v)) {
          out.push(v);
        }
      } else {
        findRIds(v, relsKeys, out);
      }
    }
  }
  return out;
}

async function extractDocxImages(fileSpec) {
  let docxPath = path.join(workspaceRoot, fileSpec.name);
  if (!fs.existsSync(docxPath)) {
    if (fileSpec.name === 'Bài 4  hsb.docx') {
      const alt = path.join(workspaceRoot, 'Bài 4 hsb.docx');
      if (fs.existsSync(alt)) docxPath = alt;
    }
  }
  
  if (!fs.existsSync(docxPath)) {
    console.log(`Skipping ${fileSpec.id} because ${fileSpec.name} not found.`);
    return [];
  }
  
  const buf = fs.readFileSync(docxPath);
  const zip = await JSZip.loadAsync(buf);

  const relsXml = await zip.file('word/_rels/document.xml.rels')?.async('string');
  const rels = new Map();
  if (relsXml) {
    const relsDoc = parser.parse(relsXml);
    for (const rel of asArray(relsDoc?.Relationships?.Relationship)) {
      const id = rel['@_Id'];
      const target = rel['@_Target'];
      if (id && target?.startsWith('media/')) {
        rels.set(id, `word/${target}`);
      }
    }
  }

  const docXml = await zip.file('word/document.xml')?.async('string');
  if (!docXml) {
    console.log(`No document.xml in ${fileSpec.name}`);
    return [];
  }

  const doc = parser.parse(docXml);
  const body = doc?.document?.body ?? doc?.body;
  const paragraphs = asArray(body?.p);

  const outDir = path.join(workspaceRoot, 'public/images/steps', fileSpec.id);
  if (fs.existsSync(outDir)) {
    fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));
  } else {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let imgCounter = 0;
  const manifestUrls = [];
  const relsKeys = new Set(rels.keys());
  
  console.log(`\nProcessing ${fileSpec.id} - ${fileSpec.name}:`);

  for (const p of paragraphs) {
    const text = collectText(p).replace(/\s+/g, ' ').trim();
    const rIds = findRIds(p, relsKeys);
    const embeds = rIds.map(id => rels.get(id)).filter(Boolean);
      
    if (embeds.length > 0) {
      if (text) {
        console.log(`  Text: "${text.slice(0, 60)}..."`);
      }
      for (const mediaPath of embeds) {
        imgCounter++;
        const ext = path.extname(mediaPath).toLowerCase() || '.png';
        const fileName = `${String(imgCounter).padStart(2, '0')}${ext}`;
        const data = await zip.file(mediaPath)?.async('nodebuffer');
        if (data) {
          fs.writeFileSync(path.join(outDir, fileName), data);
          manifestUrls.push(`/images/steps/${fileSpec.id}/${fileName}`);
          console.log(`    Saved Image #${imgCounter} (from ${mediaPath}) -> ${fileName}`);
        }
      }
    }
  }
  return manifestUrls;
}

async function main() {
  const manifest = {};
  for (const fileSpec of docxFiles) {
    manifest[fileSpec.id] = await extractDocxImages(fileSpec) || [];
  }
  
  fs.writeFileSync(
    path.join(workspaceRoot, 'src/data/step-evidence.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  );
  fs.writeFileSync(
    path.join(workspaceRoot, 'public/images/steps/manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  );
  console.log('\nDone! Manifest saved to src/data/step-evidence.json');
}

main().catch(console.error);
