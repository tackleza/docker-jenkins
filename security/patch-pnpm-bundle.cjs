// Reviewed backport of ip-address10.7.4's zone parsing fix into pnpm10's bundled copy.
// Updating only dist/node_modules does not fix pnpm's self-contained executable.
const fs = require('node:fs');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = '/usr/local/lib/node_modules/pnpm';
assert.equal(require(root + '/package.json').version, '10.34.7');
const file = root + '/dist/pnpm.cjs';
const source = fs.readFileSync(file, 'utf8');
assert.equal(crypto.createHash('sha256').update(source).digest('hex'),
  'bc2e442806848178a03cdf1c134b7fc356fd99c90de4ae211e27986fe7a4c8c5');
const before = `        const zone = constants6.RE_ZONE_STRING.exec(address);
        if (zone) {
          this.zone = zone[0];
          address = address.replace(constants6.RE_ZONE_STRING, "");
        }`;
const after = `        const zoneStart = address.indexOf('%');
        if (zoneStart !== -1 && /^.*$/.test(address.slice(zoneStart))) {
          this.zone = address.slice(zoneStart);
          address = address.slice(0, zoneStart);
        }`;
// Verify the replacement algorithm is exactly the downloaded upstream fix.
const official = fs.readFileSync('/usr/local/lib/node_modules/npm/node_modules/ip-address/dist/ipv6.js', 'utf8');
const normalize = text => text.replace(/\s+/g, '');
assert(normalize(official).includes(normalize(after)));
assert.equal(source.split(before).length, 2, 'Expected exactly one bundled vulnerable constructor');
let patched = source.replace(before, after);
patched = patched.replaceAll('.pnpm/ip-address@10.7.3/', '.pnpm/ip-address@10.7.4/');
assert(!patched.includes('RE_ZONE_STRING.exec(address)'));
fs.writeFileSync(file, patched);
console.log('pnpm10.34.7 bundled IPv6 constructor patched with the verified upstream10.7.4 algorithm');
