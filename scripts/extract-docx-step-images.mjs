/**
 * Extract images from lesson DOCX files and map to UI process steps.
 * Uses scripts/docx-step-map.json for report-style lessons; headline match for BT1.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const LESSONS = {
  bt1: { docx: 'bài tập lms/Bài 1 - Dương.docx', stepCount: 12 },
  bt2: { docx: 'bài tập lms/Bài 2-Dương.docx', stepCount: 11 },
  bt3: { docx: 'bài tập lms/Bài 3-Dương.docx', stepCount: 10 },
  bt4: { docx: 'bài tập lms/Bài 4-Dương.docx', stepCount: 11 },
  bt5: { docx: 'bài tập lms/Bài 5-Dương.docx', stepCount: 10 },
  bt6: { docx: 'bài tập lms/Bài 6-Dương.docx', stepCount: 10 },
};

const stepMapConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'docx-step-map.json'), 'utf8'),
);

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  isArray: (name) => ['p', 'r', 't', 'blip'].includes(name),
});

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

function findBlipEmbeds(node, out = []) {
  if (node == null) return out;
  if (typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    for (const item of node) findBlipEmbeds(item, out);
    return out;
  }
  if (node.blip) {
    for (const blip of asArray(node.blip)) {
      const id = blip['@_embed'] ?? blip['@_r:embed'];
      if (id) out.push(id);
    }
  }
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('@_')) continue;
    findBlipEmbeds(v, out);
  }
  return out;
}

function compact(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
}

function headline(text) {
  const t = text.replace(/\s+/g, ' ').trim();
  const colon = t.indexOf(':');
  const head = colon > 2 ? t.slice(0, colon) : t.slice(0, 80);
  return compact(head.replace(/^\d+[\.\)]\s*/, ''));
}

function loadStepTextsFromApp() {
  const raw = fs.readFileSync(path.join(root, 'src/data/lesson-steps.ts'), 'utf8');
  // Remove types and exports to evaluate as JS
  const js = raw
    .replace(/export\s+interface\s+\w+\s*\{[^}]*\}/g, '')
    .replace(/export\s+const\s+LESSON_STEPS\s*:\s*[^=]+=/g, 'globalThis.TEMP_LESSON_STEPS =')
    .replace(/export\s+/g, '');
  
  eval(js);
  const LESSON_STEPS = globalThis.TEMP_LESSON_STEPS;
  delete globalThis.TEMP_LESSON_STEPS;
  
  const byBt = {};
  for (let i = 0; i < 6; i++) {
    byBt[`bt${i+1}`] = (LESSON_STEPS[i] || []).map(s => s.text);
  }
  return byBt;
}

async function parseDocx(docxPath) {
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
  if (!docXml) throw new Error(`No document.xml in ${docxPath}`);

  const doc = parser.parse(docXml);
  const body = doc?.document?.body ?? doc?.body;
  const paragraphs = asArray(body?.p);

  /** @type {{ text: string, embeds: string[] }[]} */
  const blocks = [];
  /** @type {string[]} ordered media paths */
  const orderedImages = [];

  for (const p of paragraphs) {
    const text = collectText(p).replace(/\s+/g, ' ').trim();
    const embeds = findBlipEmbeds(p)
      .map((id) => rels.get(id))
      .filter(Boolean);
    if (!text && embeds.length === 0) continue;
    blocks.push({ text, embeds });
    for (const e of embeds) orderedImages.push(e);
  }

  return { zip, blocks, orderedImages };
}

function matchHeadlineToStep(blockText, stepTexts) {
  const bh = headline(blockText);
  if (bh.length < 4) return -1;

  let bestIdx = -1;
  let bestLen = 0;

  for (let i = 0; i < stepTexts.length; i++) {
    const sh = headline(stepTexts[i]);
    if (!sh) continue;
    const matches =
      bh === sh ||
      (bh.length >= 8 && sh.length >= 8 && (bh.includes(sh) || sh.includes(bh)));
    if (matches) {
      const len = Math.min(bh.length, sh.length);
      if (len > bestLen) {
        bestLen = len;
        bestIdx = i;
      }
    }
  }
  return bestIdx;
}

/** Headline-based mapping (BT1 practical walkthrough) */
function mapByHeadline(blocks, stepTexts, stepCount) {
  const stepMedia = Array.from({ length: stepCount }, () => []);

  let currentStep = -1;
  let inPractice = false;

  for (const block of blocks) {
    if (/thực hiện/i.test(block.text)) inPractice = true;

    const headIdx = block.text ? matchHeadlineToStep(block.text, stepTexts) : -1;
    if (headIdx >= 0) currentStep = headIdx;

    if (block.embeds.length > 0 && inPractice && currentStep >= 0) {
      for (const mediaPath of block.embeds) {
        if (!stepMedia[currentStep].includes(mediaPath)) {
          stepMedia[currentStep].push(mediaPath);
        }
      }
    }
  }

  return stepMedia;
}

/** Manual map: step number (1-based string key) → image index or array */
function mapByConfig(orderedImages, config, stepCount) {
  const stepMedia = Array.from({ length: stepCount }, () => []);

  for (let step = 1; step <= stepCount; step++) {
    const key = String(step);
    const spec = config[key];
    if (spec == null) continue;

    const indices = Array.isArray(spec) ? spec : [spec];
    for (const idx of indices) {
      const mediaPath = orderedImages[idx - 1];
      if (!mediaPath) {
        console.warn(`  Image index ${idx} missing for step ${step}`);
        continue;
      }
      if (!stepMedia[step - 1].includes(mediaPath)) {
        stepMedia[step - 1].push(mediaPath);
      }
    }
  }

  return stepMedia;
}

function extFromPath(mediaPath) {
  const ext = path.extname(mediaPath).toLowerCase();
  if (ext === '.jpeg') return '.jpg';
  return ext || '.png';
}

async function exportLesson(btId, { docx, stepCount }, stepTexts) {
  const docxPath = path.join(root, docx);
  if (!fs.existsSync(docxPath)) {
    console.warn(`Skip ${btId}: missing ${docx}`);
    return Array(stepCount).fill(null);
  }

  const config = stepMapConfig[btId] ?? {};
  const texts = stepTexts.slice(0, stepCount);
  const { zip, blocks, orderedImages } = await parseDocx(docxPath);

  const stepMedia =
    config.mode === 'headline'
      ? mapByHeadline(blocks, texts, stepCount)
      : mapByConfig(orderedImages, config, stepCount);

  const outDir = path.join(root, 'public/images/steps', btId);
  if (fs.existsSync(outDir)) {
    for (const f of fs.readdirSync(outDir)) {
      fs.unlinkSync(path.join(outDir, f));
    }
  }
  fs.mkdirSync(outDir, { recursive: true });

  const evidence = [];

  for (let i = 0; i < stepCount; i++) {
    const mediaList = stepMedia[i] ?? [];
    if (mediaList.length === 0) {
      evidence.push(null);
      continue;
    }

    const urls = [];
    for (let j = 0; j < mediaList.length; j++) {
      const mediaPath = mediaList[j];
      const ext = extFromPath(mediaPath);
      const base =
        mediaList.length === 1
          ? String(i + 1).padStart(2, '0')
          : `${String(i + 1).padStart(2, '0')}${String.fromCharCode(97 + j)}`;
      const fileName = `${base}${ext}`;
      const data = await zip.file(mediaPath)?.async('nodebuffer');
      if (!data) continue;
      fs.writeFileSync(path.join(outDir, fileName), data);
      urls.push(`/images/steps/${btId}/${fileName}`);
    }

    if (urls.length === 0) evidence.push(null);
    else if (urls.length === 1) evidence.push(urls[0]);
    else evidence.push(urls);
  }

  const withImages = evidence.filter(Boolean).length;
  console.log(
    `${btId}: ${withImages}/${stepCount} steps (${orderedImages.length} images in docx)`,
  );

  return evidence;
}

async function main() {
  const stepTextsByBt = loadStepTextsFromApp();
  const manifest = {};

  for (const [btId, cfg] of Object.entries(LESSONS)) {
    manifest[btId] = await exportLesson(btId, cfg, stepTextsByBt[btId] ?? []);
  }

  const json = JSON.stringify(manifest, null, 2) + '\n';
  fs.writeFileSync(path.join(root, 'src/data/step-evidence.json'), json);
  fs.writeFileSync(path.join(root, 'public/images/steps/manifest.json'), json);
  console.log('Done — step images from DOCX (see scripts/docx-step-map.json).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

