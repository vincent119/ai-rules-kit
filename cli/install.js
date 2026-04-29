#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── IDE 設定對照表 ───
const IDE_CONFIG = {
  copilot: {
    name: 'GitHub Copilot (VS Code)',
    project: {
      global: '.github/copilot-instructions.md',
      rules: '.github/instructions',
      skills: '.github/skills',
      ext: '.instructions.md',
    },
    user: {
      rules: path.join(os.homedir(), '.copilot', 'instructions'),
      skills: path.join(os.homedir(), '.copilot', 'skills'),
      ext: '.instructions.md',
    },
  },
  cursor: {
    name: 'Cursor',
    project: {
      rules: '.cursor/rules',
      ext: '.mdc',
    },
    user: {
      rules: path.join(os.homedir(), '.cursor', 'rules'),
      ext: '.mdc',
    },
  },
  claude: {
    name: 'Claude Code',
    project: {
      global: 'CLAUDE.md',
      rules: '.claude/rules',
      ext: '.md',
    },
    user: {
      global: path.join(os.homedir(), '.claude', 'CLAUDE.md'),
      rules: path.join(os.homedir(), '.claude', 'rules'),
      ext: '.md',
    },
  },
  kiro: {
    name: 'Kiro',
    project: {
      rules: '.kiro/steering',
      skills: '.kiro/skills',
      ext: '.md',
    },
    user: {
      rules: path.join(os.homedir(), '.kiro', 'steering'),
      skills: path.join(os.homedir(), '.kiro', 'skills'),
      ext: '.md',
    },
  },
  antigravity: {
    name: 'Antigravity',
    project: {
      global: '.gemini/GEMINI.md',
      rules: '.agent/rules',
      skills: '.agent/skills',
      ext: '.md',
    },
    user: {
      global: path.join(os.homedir(), '.gemini', 'GEMINI.md'),
      rules: path.join(os.homedir(), '.agent', 'rules'),
      skills: path.join(os.homedir(), '.agent', 'skills'),
      ext: '.md',
    },
  },
};

// ─── 顏色 ───
const C = {
  r: '\x1b[0m', red: '\x1b[31m', grn: '\x1b[32m',
  ylw: '\x1b[33m', blu: '\x1b[34m', cyn: '\x1b[36m',
};
function log(msg, c) { console.log(`${C[c] || ''}${msg}${C.r}`); }

// ─── 語言設定對照表 ───
const LANG_CONFIG = {
  go: {
    minimal: 'go-core-minimal.md',
    extended: 'go-core-extended.md',
    glob: '**/*.go,**/go.mod,**/go.sum',
  },
  bash: {
    minimal: 'bash.md',
    extended: 'bash.md',
    glob: '**/*.sh,**/*.bash',
  },
  rust: {
    minimal: 'rust.md',
    extended: 'rust.md',
    glob: '**/*.rs,**/Cargo.toml',
  },
  python: {
    minimal: 'python.md',
    extended: 'python.md',
    glob: '**/*.py',
  },
  typescript: {
    minimal: 'typescript.md',
    extended: 'typescript.md',
    glob: '**/*.ts,**/*.tsx,**/*.js,**/*.jsx',
  },
  yaml: {
    minimal: 'yaml.md',
    extended: 'yaml.md',
    glob: '**/*.yaml,**/*.yml',
  },
  helm: {
    minimal: 'helm.md',
    extended: 'helm.md',
    glob: '**/Chart.yaml,**/values.yaml,**/templates/**/*.yaml',
  },
  pulumi: {
    minimal: 'pulumi.md',
    extended: 'pulumi.md',
    glob: '**/Pulumi.yaml,**/Pulumi.*.yaml',
  },
  react: {
    minimal: 'react.md',
    extended: 'react.md',
    glob: '**/*.tsx,**/*.jsx',
  },
};

// ─── 參數解析 ───
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { ide: null, global: false, mode: null, lang: null, skills: null, extras: null, dryRun: false, help: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--help': case '-h': opts.help = true; break;
      case '--global': opts.global = true; break;
      case '--dry-run': opts.dryRun = true; break;
      case '--copilot': case '--vscode': opts.ide = 'copilot'; break;
      case '--cursor': opts.ide = 'cursor'; break;
      case '--claude': opts.ide = 'claude'; break;
      case '--kiro': opts.ide = 'kiro'; break;
      case '--antigravity': opts.ide = 'antigravity'; break;
      case '--mode': opts.mode = args[++i]; break;
      case '--lang': opts.lang = args[++i]; break;
      case '--skills': opts.skills = args[++i]; break;
      case '--extras': opts.extras = args[++i]; break;
    }
  }

  // 預設 lang：null（安裝全部語言）
  if (!opts.lang) opts.lang = null;

  // 預設 mode：copilot/claude 用 minimal（4KB 限制），其他用 extended
  if (!opts.mode) {
    opts.mode = (opts.ide === 'copilot' || opts.ide === 'claude') ? 'minimal' : 'extended';
  }

  return opts;
}

// ─── Help ───
function showHelp() {
  console.log(`
${C.blu}ai-rules-kit - AI 開發規範安裝工具${C.r}

${C.ylw}用法：${C.r}
  npx @vincent119/ai-rules-kit --<ide> [--global] [options]

${C.ylw}IDE 選項：${C.r}
  --copilot, --vscode   GitHub Copilot (VS Code / JetBrains)
  --cursor              Cursor
  --claude              Claude Code
  --kiro                Kiro
  --antigravity         Antigravity (Google)

${C.ylw}範圍：${C.r}
  (預設)                安裝到目前專案 (project level)
  --global              安裝到使用者目錄 (user level)

${C.ylw}其他選項：${C.r}
  --mode <minimal|extended>   規範版本（預設：copilot/claude=minimal, 其他=extended）
  --lang <go|bash|rust|...>   語言規範（預設：全部，可逗號分隔指定語言）
  --extras "commit,pr"        額外規範（commit-message, pull-request）
  --skills "go-ddd,go-grpc"   只安裝特定 skills
  --dry-run                   預覽安裝路徑，不實際寫入
  --help, -h                  顯示說明

${C.ylw}範例：${C.r}
  npx @vincent119/ai-rules-kit --kiro
  npx @vincent119/ai-rules-kit --kiro --global
  npx @vincent119/ai-rules-kit --copilot --mode extended
  npx @vincent119/ai-rules-kit --cursor --lang "go,bash"
  npx @vincent119/ai-rules-kit --cursor --skills "go-ddd,go-grpc"
`);
}

// ─── 檔案操作 ───
function mkdirp(dir) { fs.mkdirSync(dir, { recursive: true }); }

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    mkdirp(dest);
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// ─── 找到 source 目錄 ───
function findSourceDir() {
  const candidates = [
    path.join(__dirname, '..', 'source'),
    path.join(__dirname, 'source'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function findSkillsDir() {
  const candidates = [
    path.join(__dirname, '..', 'skills'),
    path.join(__dirname, 'skills'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

// ─── 讀取 source 並加上對應 IDE 的 frontmatter ───
function readSource(sourceDir, filename) {
  const fp = path.join(sourceDir, filename);
  if (!fs.existsSync(fp)) return null;
  return fs.readFileSync(fp, 'utf8');
}

function wrapFrontmatter(ide, content, type, glob) {
  switch (ide) {
    case 'copilot':
      if (type === 'global') return `---\napplyTo: "**"\n---\n\n${content}`;
      return `---\napplyTo: "${glob}"\n---\n\n${content}`;

    case 'cursor':
      if (type === 'global') return `---\nglobs: "**/*"\nalwaysApply: true\n---\n\n${content}`;
      return `---\nglobs: "${glob}"\nalwaysApply: true\n---\n\n${content}`;

    case 'claude':
      return content;

    case 'kiro':
      if (type === 'global') return `---\ninclusion: always\n---\n\n${content}`;
      const patterns = glob.split(',').map(g => `  - '${g.trim()}'`).join('\n');
      return `---\ninclusion: always\nfilePatterns:\n${patterns}\n---\n\n${content}`;

    case 'antigravity':
      return content;

    default:
      return content;
  }
}

// ─── 產生檔名 ───
function ruleFilename(ide, name, config) {
  const ext = config.ext || '.md';
  return `${name}${ext}`;
}

// ─── 主安裝邏輯 ───
function install(opts) {
  const sourceDir = findSourceDir();
  const skillsDir = findSkillsDir();

  if (!sourceDir) {
    log('找不到 source/ 目錄', 'red');
    process.exit(1);
  }

  const ideConf = IDE_CONFIG[opts.ide];
  const scope = opts.global ? 'user' : 'project';
  const paths = ideConf[scope];

  log('', 'r');
  log(`ai-rules-kit 安裝工具`, 'blu');
  log(`${'─'.repeat(40)}`, 'blu');
  log(`IDE:    ${ideConf.name}`, 'grn');
  log(`範圍:   ${opts.global ? 'Global (User)' : 'Project'}`, 'grn');
  log(`模式:   ${opts.mode}`, 'grn');
  log(`語言:   ${opts.lang || '全部'}`, 'grn');
  if (opts.skills) log(`Skills: ${opts.skills}`, 'grn');
  if (opts.dryRun) log(`[DRY RUN] 不會實際寫入檔案`, 'ylw');
  log('', 'r');

  const actions = []; // { type, src, dest }

  // 1. Global 規範
  const globalContent = readSource(sourceDir, 'global.md');
  if (globalContent) {
    const wrapped = wrapFrontmatter(opts.ide, globalContent, 'global', '**');

    if (paths.global) {
      const dest = opts.global ? paths.global : path.resolve(process.cwd(), paths.global);
      actions.push({ type: 'write', dest, content: wrapped });
    } else {
      const rulesDir = opts.global ? paths.rules : path.resolve(process.cwd(), paths.rules);
      const filename = ruleFilename(opts.ide, 'global', paths);
      actions.push({ type: 'write', dest: path.join(rulesDir, filename), content: wrapped });
    }
  }

  // 2. 語言規範（根據 --lang，未指定則安裝全部）
  const langs = opts.lang ? opts.lang.split(',').map(l => l.trim()) : Object.keys(LANG_CONFIG);
  for (const lang of langs) {
    const langConf = LANG_CONFIG[lang];
    if (!langConf) {
      log(`  警告：不支援的語言 "${lang}"，跳過`, 'ylw');
      continue;
    }
    const sourceFile = opts.mode === 'minimal' ? langConf.minimal : langConf.extended;
    const langContent = readSource(sourceDir, sourceFile);
    if (langContent) {
      const wrapped = wrapFrontmatter(opts.ide, langContent, 'lang', langConf.glob);
      const rulesDir = opts.global ? paths.rules : path.resolve(process.cwd(), paths.rules);
      const filename = ruleFilename(opts.ide, lang, paths);
      actions.push({ type: 'write', dest: path.join(rulesDir, filename), content: wrapped });
    }
  }

  // 3. Extras（commit-message, pull-request）
  if (opts.extras) {
    const EXTRAS_MAP = {
      commit: { file: 'commit-message.md', name: 'commit-message' },
      pr: { file: 'pull-request.md', name: 'pull-request' },
    };
    const extraList = opts.extras.split(',').map(e => e.trim());
    for (const extra of extraList) {
      const conf = EXTRAS_MAP[extra];
      if (!conf) {
        log(`  警告：不支援的 extra "${extra}"，跳過`, 'ylw');
        continue;
      }
      const content = readSource(sourceDir, conf.file);
      if (content) {
        const wrapped = wrapFrontmatter(opts.ide, content, 'global', '**');
        const rulesDir = opts.global ? paths.rules : path.resolve(process.cwd(), paths.rules);
        const filename = ruleFilename(opts.ide, conf.name, paths);
        actions.push({ type: 'write', dest: path.join(rulesDir, filename), content: wrapped });
      }
    }
  }

  // 4. Skills（僅支援 kiro / antigravity）
  if (skillsDir && paths.skills) {
    const skillsDest = opts.global ? paths.skills : path.resolve(process.cwd(), paths.skills);
    let skillList = fs.readdirSync(skillsDir).filter(f =>
      fs.statSync(path.join(skillsDir, f)).isDirectory()
    );

    // 篩選指定 skills
    if (opts.skills) {
      const selected = opts.skills.split(',').map(s => s.trim());
      skillList = skillList.filter(s => selected.includes(s));
    }

    for (const skill of skillList) {
      actions.push({ type: 'copy', src: path.join(skillsDir, skill), dest: path.join(skillsDest, skill) });
    }
  }

  // 執行
  log('安裝項目：', 'cyn');
  for (const action of actions) {
    if (action.type === 'write') {
      log(`  寫入 ${action.dest}`, 'r');
      if (!opts.dryRun) {
        mkdirp(path.dirname(action.dest));
        fs.writeFileSync(action.dest, action.content, 'utf8');
      }
    } else if (action.type === 'copy') {
      log(`  複製 ${path.basename(action.src)}/ -> ${action.dest}`, 'r');
      if (!opts.dryRun) {
        copyRecursive(action.src, action.dest);
      }
    }
  }

  log('', 'r');
  if (opts.dryRun) {
    log('DRY RUN 完成，未寫入任何檔案', 'ylw');
  } else {
    log('安裝完成', 'grn');
  }
}

// ─── List ───
function showLangList() {
  log('支援的語言規範：', 'blu');
  for (const [name, conf] of Object.entries(LANG_CONFIG)) {
    log(`  ${name.padEnd(14)} ${conf.glob}`, 'r');
  }
}

function showSkillList() {
  const skillsDir = findSkillsDir();
  if (!skillsDir) { log('找不到 skills/ 目錄', 'red'); return; }
  const skills = fs.readdirSync(skillsDir)
    .filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory())
    .sort();
  log(`支援的 Skills（共 ${skills.length} 個）：`, 'blu');
  for (const s of skills) { log(`  ${s}`, 'r'); }
}

// ─── Main ───
function main() {
  const opts = parseArgs();

  if (opts.help) { showHelp(); process.exit(0); }
  if (opts.lang === 'list') { showLangList(); process.exit(0); }
  if (opts.skills === 'list') { showSkillList(); process.exit(0); }

  if (!opts.ide) {
    log('請指定 IDE：--copilot / --cursor / --claude / --kiro / --antigravity', 'red');
    log('使用 --help 查看完整說明', 'ylw');
    process.exit(1);
  }

  try {
    install(opts);
  } catch (err) {
    log(`安裝失敗: ${err.message}`, 'red');
    process.exit(1);
  }
}

main();
