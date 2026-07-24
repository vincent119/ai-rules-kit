#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── IDE 設定對照表 ───
const IDE_CONFIG = {
  copilot: {
    name: 'GitHub Copilot (VS Code)',
    supportsSkills: true,
    supportsHooks: false,
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
    supportsSkills: false,
    supportsHooks: false,
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
    supportsSkills: false,
    supportsHooks: true,
    project: {
      global: 'CLAUDE.md',
      rules: '.claude/rules',
      hooks: '.claude',
      ext: '.md',
    },
    user: {
      global: path.join(os.homedir(), '.claude', 'CLAUDE.md'),
      rules: path.join(os.homedir(), '.claude', 'rules'),
      ext: '.md',
    },
  },
  codex: {
    name: 'Codex',
    supportsSkills: true,
    supportsHooks: false,
    project: {
      global: 'AGENTS.md',
      rules: '.codex/rules',
      skills: '.codex/skills',
      ext: '.md',
    },
    user: {
      global: path.join(os.homedir(), '.codex', 'AGENTS.md'),
      rules: path.join(os.homedir(), '.codex', 'rules'),
      skills: path.join(os.homedir(), '.codex', 'skills'),
      ext: '.md',
    },
  },
  kiro: {
    name: 'Kiro',
    supportsSkills: true,
    supportsHooks: true,
    project: {
      rules: '.kiro/steering',
      skills: '.kiro/skills',
      hooks: '.kiro/hooks',
      agents: '.kiro/agents',
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
    supportsSkills: true,
    supportsHooks: false,
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
  const opts = {
    ide: null, global: false, mode: null, lang: null,
    skills: null, extras: null, dryRun: false, help: false,
    installRules: false, installSkills: false, installHooks: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--help': case '-h': opts.help = true; break;
      case '--global': opts.global = true; break;
      case '--dry-run': opts.dryRun = true; break;
      case '--copilot': case '--vscode': opts.ide = 'copilot'; break;
      case '--cursor': opts.ide = 'cursor'; break;
      case '--claude': opts.ide = 'claude'; break;
      case '--codex': opts.ide = 'codex'; break;
      case '--kiro': opts.ide = 'kiro'; break;
      case '--antigravity': opts.ide = 'antigravity'; break;
      case '--mode': opts.mode = args[++i]; break;
      case '--lang': opts.lang = args[++i]; break;
      case '--skills': {
        opts.installSkills = true;
        const next = args[i + 1];
        if (next && !next.startsWith('--')) {
          opts.skills = next;
          i++;
        }
        break;
      }
      case '--extras': opts.extras = args[++i]; break;
      case '--rules': opts.installRules = true; break;
      case '--hooks': opts.installHooks = true; break;
      case '--all': opts.installRules = true; opts.installSkills = true; opts.installHooks = true; break;
    }
  }

  // 若三個旗標都沒指定，預設全裝
  if (!opts.installRules && !opts.installSkills && !opts.installHooks) {
    opts.installRules = true;
    opts.installSkills = true;
    opts.installHooks = true;
  }

  if (!opts.lang) opts.lang = null;
  if (!opts.mode) {
    opts.mode = (opts.ide === 'copilot' || opts.ide === 'claude' || opts.ide === 'codex') ? 'minimal' : 'extended';
  }

  return opts;
}

// ─── Help ───
function showHelp() {
  console.log(`
${C.blu}ai-rules-kit - AI 開發規範安裝工具${C.r}

${C.ylw}用法：${C.r}
  npx @vincent119/ai-rules-kit --<ide> [選項]

${C.ylw}IDE 選項：${C.r}
  --copilot, --vscode   GitHub Copilot (VS Code / JetBrains)
  --cursor              Cursor
  --claude              Claude Code
  --codex               Codex
  --kiro                Kiro
  --antigravity         Antigravity (Google)

${C.ylw}安裝項目（預設全部）：${C.r}
  --rules               只安裝語言規範
  --skills              只安裝 Skills
  --hooks               只安裝 Hooks（僅 kiro / claude，不支援 --global）
  --all                 安裝全部（rules + skills + hooks）

${C.ylw}範圍：${C.r}
  (預設)                安裝到目前專案 (project level)
  --global              安裝到使用者目錄（hooks 不支援 global）

${C.ylw}其他選項：${C.r}
  --mode <minimal|extended>   規範版本（預設：copilot/claude/codex=minimal, 其他=extended）
  --lang <go|bash|rust|...>   語言規範（預設：全部，逗號分隔）
  --skills <names>            只安裝指定 Skills（逗號分隔）
  --extras "commit,pr"        額外規範（commit-message, pull-request）
  --dry-run                   預覽安裝路徑，不實際寫入
  --help, -h                  顯示說明

${C.ylw}範例：${C.r}
  npx @vincent119/ai-rules-kit --kiro
  npx @vincent119/ai-rules-kit --kiro --rules --lang "go,rust"
  npx @vincent119/ai-rules-kit --kiro --hooks
  npx @vincent119/ai-rules-kit --claude --hooks
  npx @vincent119/ai-rules-kit --codex --skills
  npx @vincent119/ai-rules-kit --kiro --global --rules
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

function mergeJson(destPath, newObj) {
  let existing = {};
  if (fs.existsSync(destPath)) {
    try { existing = JSON.parse(fs.readFileSync(destPath, 'utf8')); } catch {}
  }
  const merged = deepMerge(existing, newObj);
  fs.writeFileSync(destPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
}

function deepMerge(target, source) {
  const out = Object.assign({}, target);
  for (const key of Object.keys(source)) {
    if (Array.isArray(source[key])) {
      out[key] = [...(target[key] || []), ...source[key]];
    } else if (source[key] && typeof source[key] === 'object') {
      out[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

// ─── 找目錄 ───
function findDir(name) {
  const candidates = [
    path.join(__dirname, '..', name),
    path.join(__dirname, name),
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
    case 'codex':
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

function ruleFilename(ide, name, config) {
  return `${name}${config.ext || '.md'}`;
}

// ─── 安裝 Hooks ───
function installHooks(opts, hooksSourceDir, cwd) {
  const ideConf = IDE_CONFIG[opts.ide];

  if (!ideConf.supportsHooks) {
    log(`  警告：${ideConf.name} 不支援 Hooks，跳過`, 'ylw');
    return [];
  }
  if (opts.global) {
    log(`  警告：Hooks 不支援 --global 安裝，跳過`, 'ylw');
    return [];
  }

  const actions = [];
  const hookDirs = fs.readdirSync(hooksSourceDir)
    .filter(f => fs.statSync(path.join(hooksSourceDir, f)).isDirectory());

  for (const hookName of hookDirs) {
    const hookSrc = path.join(hooksSourceDir, hookName);
    const files = fs.readdirSync(hookSrc);

    for (const file of files) {
      const filePath = path.join(hookSrc, file);
      const stat = fs.statSync(filePath);

      if (opts.ide === 'kiro') {
        if (stat.isDirectory()) {
          const dest = path.join(cwd, '.kiro', 'hooks', hookName, file);
          actions.push({ type: 'copy', src: filePath, dest });
          continue;
        }
        if (file.endsWith('.kiro.hook')) {
          // IDE UI hook → .kiro/hooks/
          actions.push({ type: 'copyFile', src: filePath, dest: path.join(cwd, ideConf.project.hooks, file) });
        } else if (file.endsWith('.json') && !file.endsWith('.claude.json')) {
          // CLI agent hook → .kiro/agents/
          actions.push({ type: 'copyFile', src: filePath, dest: path.join(cwd, ideConf.project.agents, file) });
        }
      } else if (opts.ide === 'claude') {
        if (stat.isDirectory()) {
          const dest = path.join(cwd, '.claude', 'hooks', hookName, file);
          actions.push({ type: 'copy', src: filePath, dest });
          continue;
        }
        if (file.endsWith('.claude.json')) {
          const hookConf = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          actions.push({ type: 'mergeJson', dest: path.join(cwd, ideConf.project.hooks, 'settings.json'), content: hookConf });
        }
      }
    }
  }

  return actions;
}

// ─── 主安裝邏輯 ───
function install(opts) {
  const sourceDir = findDir('source');
  const skillsDir = findDir('skills');
  const hooksDir = findDir('hooks');
  const cwd = process.cwd();

  if (!sourceDir) { log('找不到 source/ 目錄', 'red'); process.exit(1); }

  const ideConf = IDE_CONFIG[opts.ide];
  const scope = opts.global ? 'user' : 'project';
  const paths = ideConf[scope];

  const installParts = [
    opts.installRules && 'rules',
    opts.installSkills && ideConf.supportsSkills && 'skills',
    opts.installHooks && ideConf.supportsHooks && !opts.global && 'hooks',
  ].filter(Boolean);

  log('', 'r');
  log(`ai-rules-kit 安裝工具`, 'blu');
  log(`${'─'.repeat(40)}`, 'blu');
  log(`IDE:    ${ideConf.name}`, 'grn');
  log(`範圍:   ${opts.global ? 'Global (User)' : 'Project'}`, 'grn');
  log(`模式:   ${opts.mode}`, 'grn');
  log(`安裝:   ${installParts.join(', ') || '（無）'}`, 'grn');
  if (opts.dryRun) log(`[DRY RUN] 不會實際寫入檔案`, 'ylw');
  log('', 'r');

  const actions = [];

  // ── Rules ──
  if (opts.installRules) {
    // Global 規範
    const globalContent = readSource(sourceDir, 'global.md');
    if (globalContent) {
      const wrapped = wrapFrontmatter(opts.ide, globalContent, 'global', '**');
      if (paths.global) {
        const dest = opts.global ? paths.global : path.resolve(cwd, paths.global);
        actions.push({ type: 'write', dest, content: wrapped });
      } else {
        const rulesDir = opts.global ? paths.rules : path.resolve(cwd, paths.rules);
        actions.push({ type: 'write', dest: path.join(rulesDir, ruleFilename(opts.ide, 'global', paths)), content: wrapped });
      }
    }

    // 語言規範
    const langs = opts.lang ? opts.lang.split(',').map(l => l.trim()) : Object.keys(LANG_CONFIG);
    for (const lang of langs) {
      const langConf = LANG_CONFIG[lang];
      if (!langConf) { log(`  警告：不支援的語言 "${lang}"，跳過`, 'ylw'); continue; }
      const content = readSource(sourceDir, opts.mode === 'minimal' ? langConf.minimal : langConf.extended);
      if (content) {
        const wrapped = wrapFrontmatter(opts.ide, content, 'lang', langConf.glob);
        const rulesDir = opts.global ? paths.rules : path.resolve(cwd, paths.rules);
        actions.push({ type: 'write', dest: path.join(rulesDir, ruleFilename(opts.ide, lang, paths)), content: wrapped });
      }
    }

    // Extras
    if (opts.extras) {
      const EXTRAS_MAP = {
        commit: { file: 'commit-message.md', name: 'commit-message' },
        pr: { file: 'pull-request.md', name: 'pull-request' },
      };
      for (const extra of opts.extras.split(',').map(e => e.trim())) {
        const conf = EXTRAS_MAP[extra];
        if (!conf) { log(`  警告：不支援的 extra "${extra}"，跳過`, 'ylw'); continue; }
        const content = readSource(sourceDir, conf.file);
        if (content) {
          const wrapped = wrapFrontmatter(opts.ide, content, 'global', '**');
          const rulesDir = opts.global ? paths.rules : path.resolve(cwd, paths.rules);
          actions.push({ type: 'write', dest: path.join(rulesDir, ruleFilename(opts.ide, conf.name, paths)), content: wrapped });
        }
      }
    }

    // Specs 共用規範
    if (opts.ide === 'kiro' || opts.ide === 'codex') {
      for (const filename of ['kiro-specs.md']) {
        const content = readSource(sourceDir, filename);
        if (content) {
          const wrapped = wrapFrontmatter(opts.ide, content, 'global', '**');
          const rulesDir = opts.global ? paths.rules : path.resolve(cwd, paths.rules);
          const outputName = opts.ide === 'codex' ? 'specs' : filename.replace(/\.md$/, '');
          actions.push({ type: 'write', dest: path.join(rulesDir, outputName + paths.ext), content: wrapped });
        }
      }
    }
  }

  // ── Skills ──
  if (opts.installSkills && skillsDir && paths.skills) {
    const skillsDest = opts.global ? paths.skills : path.resolve(cwd, paths.skills);
    let skillList = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());
    if (opts.skills) {
      const selected = opts.skills.split(',').map(s => s.trim());
      skillList = skillList.filter(s => selected.includes(s));
    }
    for (const skill of skillList) {
      actions.push({ type: 'copy', src: path.join(skillsDir, skill), dest: path.join(skillsDest, skill) });
    }
  }

  // ── Hooks ──
  if (opts.installHooks && hooksDir) {
    const hookActions = installHooks(opts, hooksDir, cwd);
    actions.push(...hookActions);
  }

  // ── 執行 ──
  log('安裝項目：', 'cyn');
  for (const action of actions) {
    if (action.type === 'write') {
      log(`  寫入 ${action.dest}`, 'r');
      if (!opts.dryRun) { mkdirp(path.dirname(action.dest)); fs.writeFileSync(action.dest, action.content, 'utf8'); }
    } else if (action.type === 'copyFile') {
      log(`  複製 ${path.basename(action.src)} -> ${action.dest}`, 'r');
      if (!opts.dryRun) { mkdirp(path.dirname(action.dest)); fs.copyFileSync(action.src, action.dest); }
    } else if (action.type === 'copy') {
      log(`  複製 ${path.basename(action.src)}/ -> ${action.dest}`, 'r');
      if (!opts.dryRun) { copyRecursive(action.src, action.dest); }
    } else if (action.type === 'mergeJson') {
      log(`  合併 -> ${action.dest}`, 'r');
      if (!opts.dryRun) { mkdirp(path.dirname(action.dest)); mergeJson(action.dest, action.content); }
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
  const skillsDir = findDir('skills');
  if (!skillsDir) { log('找不到 skills/ 目錄', 'red'); return; }
  const skills = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory()).sort();
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
    log('請指定 IDE：--copilot / --cursor / --claude / --codex / --kiro / --antigravity', 'red');
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
