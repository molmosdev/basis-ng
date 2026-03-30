const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const semver = require('semver');
const execSync = require('child_process').execSync;

const lib = process.argv[2];
const releaseType = process.argv[3] || 'patch';
const preId = process.argv[4];

if (!lib) {
  console.error('❌ Specify a lib: primitives or styles');
  process.exit(1);
}

const packageJsonPath = path.join(__dirname, 'libs', lib, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const newVersion =
  releaseType === 'prerelease'
    ? semver.inc(packageJson.version, 'prerelease', preId || 'alpha')
    : semver.inc(packageJson.version, releaseType);

packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log(`📦 Publishing ${lib} v${newVersion}...`);

if (lib === 'primitives') {
  // 1. Build Angular library
  execSync(`ng build ${lib}`, { stdio: 'inherit' });

  const distPath = path.join(__dirname, 'dist', lib);
  // Buscamos el .npmrc donde me has indicado
  const srcNpmrc = path.join(__dirname, 'libs', lib, '.npmrc');
  const distNpmrc = path.join(distPath, '.npmrc');

  // 2. COPIAR EL .NPMRC AL DIST
  if (fs.existsSync(srcNpmrc)) {
    fs.copyFileSync(srcNpmrc, distNpmrc);
    console.log('✅ Token .npmrc copiado desde libs/primitives a la carpeta dist.');
  } else {
    console.error(`❌ ERROR: No se encuentra el archivo .npmrc en ${srcNpmrc}`);
    process.exit(1);
  }

  // 3. Publish desde dist/primitives
  exec(
    `npm publish --access public ${releaseType === 'prerelease' ? '--tag next' : ''}`,
    { cwd: distPath },
    (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ npm publish failed: ${stderr || err.message}`);
        process.exit(1);
      }
      console.log(`✅ Published ${lib} v${newVersion}\n${stdout}`);
    },
  );
} else if (lib === 'styles') {
  const stylesPath = path.join(__dirname, 'libs', lib);
  exec(
    `npm publish --access public ${releaseType === 'prerelease' ? '--tag next' : ''}`,
    { cwd: stylesPath },
    (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ npm publish failed: ${stderr || err.message}`);
        process.exit(1);
      }
      console.log(`✅ Published ${lib} v${newVersion}\n${stdout}`);
    },
  );
}
