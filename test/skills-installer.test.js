const assert = require('assert');
const { execFileSync, spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');

const PROJECT_ROOT = path.resolve(__dirname, '..');

function writeSkill(root, id, extraFiles = {}) {
  const skillDir = path.join(root, 'skills', ...id.split('/'));
  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), `---\nname: ${id.replace(/\//g, '-')}\ndescription: 測試用 skill。\n---\n`);
  for (const [relativePath, content] of Object.entries(extraFiles)) {
    const filePath = path.join(skillDir, relativePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }
}

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-rules-kit-'));
  fs.mkdirSync(path.join(root, 'source'));
  fs.cpSync(path.join(PROJECT_ROOT, 'cli'), path.join(root, 'cli'), { recursive: true });
  writeSkill(root, 'documentation/readme', { 'references/checklist.md': 'checklist' });
  writeSkill(root, 'programming/go/grpc');
  writeSkill(root, 'infrastructure/api');
  writeSkill(root, 'documentation/api');
  writeSkill(root, 'conflict/alpha-beta');
  writeSkill(root, 'conflict-alpha/beta');
  writeSkill(root, 'sdd-skill');
  return root;
}

function run(root, cwd, args, options = {}) {
  return spawnSync(process.execPath, [path.join(root, 'cli', 'install.js'), ...args], {
    cwd,
    encoding: 'utf8',
    ...options,
  });
}

test('遞迴列出 canonical ID，忽略分類目錄', () => {
  const root = createFixture();
  const result = run(root, root, ['--skills', 'list']);

  assert.strictEqual(result.status, 0, result.stderr);
  assert.match(result.stdout, /programming\/go\/grpc/);
  assert.match(result.stdout, /documentation\/readme/);
  assert.match(result.stdout, /sdd-skill/);
  assert.doesNotMatch(result.stdout, /^  documentation$/m);
});

test('Codex 保留巢狀 skill 目錄', () => {
  const root = createFixture();
  const target = path.join(root, 'target');
  fs.mkdirSync(target);
  const result = run(root, target, ['--codex', '--skills', 'documentation/readme', '--dry-run']);

  assert.strictEqual(result.status, 0, result.stderr);
  assert.match(result.stdout, /\.codex\/skills\/documentation\/readme/);
});

test('扁平化 Adapter 使用完整 canonical ID', () => {
  const root = createFixture();
  const target = path.join(root, 'target');
  fs.mkdirSync(target);
  const result = run(root, target, ['--kiro', '--skills', 'documentation/readme', '--dry-run']);

  assert.strictEqual(result.status, 0, result.stderr);
  assert.match(result.stdout, /\.kiro\/skills\/documentation-readme/);
});

test('唯一短名稱可選取，歧義短名稱會被拒絕', () => {
  const root = createFixture();
  const target = path.join(root, 'target');
  fs.mkdirSync(target);
  const unique = run(root, target, ['--codex', '--skills', 'grpc', '--dry-run']);
  const ambiguous = run(root, target, ['--codex', '--skills', 'api', '--dry-run']);

  assert.strictEqual(unique.status, 0, unique.stderr);
  assert.match(unique.stdout, /programming\/go\/grpc/);
  assert.notStrictEqual(ambiguous.status, 0);
  assert.match(ambiguous.stdout, /Skill 名稱 "api" 不明確/);
  assert.match(ambiguous.stdout, /documentation\/api/);
  assert.match(ambiguous.stdout, /infrastructure\/api/);
});

test('舊有公開 skill ID 仍可選取搬遷後的 skill', () => {
  const root = createFixture();
  writeSkill(root, 'infrastructure/aws/eks-ami');
  const target = path.join(root, 'target');
  fs.mkdirSync(target);
  const result = run(root, target, ['--codex', '--skills', 'aws-eks-ami', '--dry-run']);

  assert.strictEqual(result.status, 0, result.stderr);
  assert.match(result.stdout, /\.codex\/skills\/infrastructure\/aws\/eks-ami/);
});

test('一層 skill 與附帶資源會完整複製', () => {
  const root = createFixture();
  const target = path.join(root, 'target');
  fs.mkdirSync(target);
  const nested = run(root, target, ['--codex', '--skills', 'documentation/readme']);
  const flat = run(root, target, ['--codex', '--skills', 'sdd-skill']);

  assert.strictEqual(nested.status, 0, nested.stderr);
  assert.strictEqual(flat.status, 0, flat.stderr);
  assert.strictEqual(
    fs.readFileSync(path.join(target, '.codex', 'skills', 'documentation', 'readme', 'references', 'checklist.md'), 'utf8'),
    'checklist',
  );
  assert.ok(fs.existsSync(path.join(target, '.codex', 'skills', 'sdd-skill', 'SKILL.md')));
});

test('扁平化輸出名稱衝突時不寫入任何 skill', () => {
  const root = createFixture();
  const target = path.join(root, 'target');
  fs.mkdirSync(target);
  const result = run(root, target, ['--kiro', '--skills', 'conflict/alpha-beta,conflict-alpha/beta']);

  assert.notStrictEqual(result.status, 0);
  assert.match(result.stdout, /Skill 輸出目錄衝突/);
  assert.ok(!fs.existsSync(path.join(target, '.kiro', 'skills')));
});
