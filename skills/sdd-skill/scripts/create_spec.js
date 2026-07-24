#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TYPES = new Set(['Feature', 'BugFix', 'Refactor', 'Docs', 'Chore']);

function usage() {
  return [
    '用法：',
    '  node skills/sdd-skill/scripts/create_spec.js spec <Type> <name>',
    '  node skills/sdd-skill/scripts/create_spec.js draft <name>',
    '',
    'Type 僅允許：Feature, BugFix, Refactor, Docs, Chore',
  ].join('\n');
}

function timestamp(date = new Date()) {
  const parts = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
  ];

  return `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3]}-${parts[4]}`;
}

function toKebabCase(value) {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function ensureName(value) {
  const name = toKebabCase(value || '');
  if (!name) {
    throw new Error('名稱不可為空，且需包含英文字母或數字。');
  }
  return name;
}

function copyTemplates(targetDir, mappings) {
  const templateDir = path.resolve(__dirname, '..', 'assets', 'templates');

  for (const [from, to] of mappings) {
    const source = path.join(templateDir, from);
    const target = path.join(targetDir, to);
    fs.copyFileSync(source, target, fs.constants.COPYFILE_EXCL);
  }
}

function createDirectory(targetDir) {
  if (fs.existsSync(targetDir)) {
    throw new Error(`目錄已存在，為避免覆蓋已停止：${targetDir}`);
  }
  fs.mkdirSync(targetDir, { recursive: true });
}

function createSpec(type, rawName) {
  if (!TYPES.has(type)) {
    throw new Error(`不支援的 Type：${type}\n${usage()}`);
  }

  const name = ensureName(rawName);
  const dir = path.resolve(process.cwd(), '.specs', `${timestamp()}_${type}-${name}`);
  createDirectory(dir);
  copyTemplates(dir, [
    ['requirements.md', 'requirements.md'],
    ['design.md', 'design.md'],
    ['tasks.md', 'tasks.md'],
  ]);
  return dir;
}

function createDraft(rawName) {
  const name = ensureName(rawName);
  const dir = path.resolve(process.cwd(), '.specs', 'drafts', `${timestamp()}_Draft-${name}`);
  createDirectory(dir);
  copyTemplates(dir, [
    ['draft-brief.md', 'brief.md'],
    ['draft-discovery.md', 'discovery.md'],
    ['draft-roadmap.md', 'roadmap.md'],
  ]);
  return dir;
}

function main(argv) {
  const [mode, first, second] = argv;

  if (mode === 'spec') {
    if (!first || !second) {
      throw new Error(usage());
    }
    return createSpec(first, second);
  }

  if (mode === 'draft') {
    if (!first || second) {
      throw new Error(usage());
    }
    return createDraft(first);
  }

  throw new Error(usage());
}

try {
  const created = main(process.argv.slice(2));
  console.log(`已建立：${path.relative(process.cwd(), created)}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
