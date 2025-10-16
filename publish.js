const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const semver = require('semver');
const execSync = require('child_process').execSync;

const project = process.argv[2]; // "primitives" o "styles"
const releaseType = process.argv[3] || 'patch';
const preId = process.argv[4];

if (!project) {
  console.error('❌ Specify a project: primitives or styles');
  process.exit(1);
}

const packageJsonPath = path.join(__dirname, 'projects', project, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Bump version
const newVersion =
  releaseType === 'prerelease'
    ? semver.inc(packageJson.version, 'prerelease', preId || 'alpha')
    : semver.inc(packageJson.version, releaseType);

packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log(`📦 Publishing ${project} v${newVersion}...`);

if (project === 'primitives') {
  // Build Angular project
  execSync(`ng build ${project}`, { stdio: 'inherit' });
  // Publish from dist/primitives
  const distPath = path.join(__dirname, 'dist', project);
  exec(
    `cd ${distPath} && npm publish --access public ${releaseType === 'prerelease' ? '--tag next' : ''}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ npm publish failed: ${stderr}`);
        process.exit(1);
      }
      console.log(`✅ Published ${project} v${newVersion}\n${stdout}`);
    },
  );
} else if (project === 'styles') {
  // Publish directly from projects/styles
  const stylesPath = path.join(__dirname, 'projects', project);
  exec(
    `cd ${stylesPath} && npm publish --access public ${releaseType === 'prerelease' ? '--tag next' : ''}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ npm publish failed: ${stderr}`);
        process.exit(1);
      }
      console.log(`✅ Published ${project} v${newVersion}\n${stdout}`);
    },
  );
}
