#!/usr/bin/env node
/**
 * 自動更新 README.md 的「語言規範」表格與「Skills 清單」區段
 * 觸發時機：source/*.md 或 skills 下任意層的 SKILL.md 被修改後
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const README = path.join(ROOT, 'README.md');

// ─── 語言規範設定（與 install.js LANG_CONFIG 同步）───
const LANG_CONFIG = {
  go:         { files: '`go-core-minimal.md` / `go-core-extended.md`', glob: '`*.go`, `go.mod`, `go.sum`' },
  bash:       { files: '`bash.md`',        glob: '`*.sh`, `*.bash`' },
  rust:       { files: '`rust.md`',        glob: '`*.rs`, `Cargo.toml`' },
  python:     { files: '`python.md`',      glob: '`*.py`' },
  typescript: { files: '`typescript.md`',  glob: '`*.ts`, `*.tsx`, `*.js`, `*.jsx`' },
  react:      { files: '`react.md`',       glob: '`*.tsx`, `*.jsx`' },
  yaml:       { files: '`yaml.md`',        glob: '`*.yaml`, `*.yml`' },
  helm:       { files: '`helm.md`',        glob: '`Chart.yaml`, `values.yaml`, `templates/**/*.yaml`' },
  pulumi:     { files: '`pulumi.md`',      glob: '`Pulumi.yaml`, `Pulumi.*.yaml`' },
};

// 來源目錄第一層 → README 分類群組
const SKILL_GROUPS = {
  documentation: 'Documentation',
  programming: 'Programming',
  frontend: 'Frontend',
  infrastructure: 'Infrastructure',
  engineering: 'Engineering',
  design: 'Design',
  business: 'Business',
  productivity: 'Productivity',
};
const GROUP_ORDER = ['Documentation', 'Programming', 'Frontend', 'Infrastructure', 'Engineering', 'Design', 'Business', 'Productivity', '通用'];

// ─── 讀取 SKILL.md 的 name 與 description ───
function parseSkillMd(skillDir, id) {
  const fp = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(fp)) return null;
  const content = fs.readFileSync(fp, 'utf8');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;
  const fm = fmMatch[1];

  const nameMatch = fm.match(/^name:\s*(.+)$/m);
  if (!nameMatch) return null;
  const name = nameMatch[1].trim();

  let desc = '';
  const lines = fm.split('\n');
  let i = lines.findIndex(l => l.startsWith('description:'));
  if (i === -1) return { id, name, desc };

  const inline = lines[i].replace(/^description:\s*/, '').replace(/^["']|["']$/g, '').trim();
  if (inline && inline !== '|') {
    // 單行
    desc = inline;
  } else {
    // 多行（| 格式）：收集縮排行直到空行或非縮排行
    const descLines = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].startsWith('  ')) {
        descLines.push(lines[j].trim());
      } else if (lines[j] === '') {
        break;
      } else {
        break;
      }
    }
    desc = descLines.join(' ');
  }

  // 移除 **適用場景** 等補充說明
  desc = desc.replace(/\s*\*\*[^*]+\*\*[\s\S]*$/, '').trim();
  // 截取第一句
  const firstSentence = desc.match(/^([^。.！!？?\n]+[。.！!？?]?)/);
  if (firstSentence) desc = firstSentence[1].trim();

  return { id, name, desc };
}

function discoverSkills(skillsDir) {
  const skills = [];

  function visit(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    if (entries.some(entry => entry.isFile() && entry.name === 'SKILL.md')) {
      const id = path.relative(skillsDir, dir).split(path.sep).join('/');
      const skill = parseSkillMd(dir, id);
      if (skill) skills.push(skill);
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) visit(path.join(dir, entry.name));
    }
  }

  visit(skillsDir);
  return skills.sort((a, b) => a.id.localeCompare(b.id));
}

// ─── 產生語言規範表格 ───
function buildLangTable() {
  const rows = Object.entries(LANG_CONFIG).map(([lang, cfg]) =>
    `| \`${lang}\` | ${cfg.files} | ${cfg.glob} |`
  );
  return [
    '| 語言 | 規範檔案 | 適用檔案類型 |',
    '|------|---------|-------------|',
    ...rows,
  ].join('\n');
}

// ─── 產生 Skills 清單 ───
function buildSkillsSection() {
  const skillsDir = path.join(ROOT, 'skills');
  // 分組
  const groups = {};
  for (const skill of discoverSkills(skillsDir)) {
    const group = SKILL_GROUPS[skill.id.split('/')[0]] || '通用';
    if (!groups[group]) groups[group] = [];
    groups[group].push(skill);
  }

  const lines = [];
  for (const g of GROUP_ORDER) {
    if (!groups[g]?.length) continue;
    lines.push(`### ${g}`, '');
    lines.push('| Skill ID | 說明 |', '|----------|------|');
    for (const { id, desc } of groups[g]) {
      lines.push(`| \`${id}\` | ${desc} |`);
    }
    lines.push('');
  }
  return lines.join('\n').trimEnd();
}

// ─── 更新 README 區段（marker 之間的內容）───
function updateSection(content, startMarker, endMarker, newBody) {
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker, start);
  if (start === -1 || end === -1) return content;
  return content.slice(0, start + startMarker.length) + '\n\n' + newBody + '\n\n' + content.slice(end);
}

// ─── Main ───
function main() {
  let readme = fs.readFileSync(README, 'utf8');

  // 更新語言規範表格（## 語言規範 到 額外規範 之前）
  readme = updateSection(readme, '## 語言規範', '額外規範', buildLangTable());

  // 更新 Skills 清單（## Skills 清單 到 ## CLI 參考）
  readme = updateSection(readme, '## Skills 清單', '## CLI 參考', buildSkillsSection());

  fs.writeFileSync(README, readme, 'utf8');

  const skillCount = discoverSkills(path.join(ROOT, 'skills')).length;
  console.log(`README 已更新：${Object.keys(LANG_CONFIG).length} 種語言規範，${skillCount} 個 Skills`);
}

main();
