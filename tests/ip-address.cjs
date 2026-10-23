const assert = require('node:assert/strict');
const { Worker } = require('node:worker_threads');
const fs = require('node:fs');
const Module = require('node:module');
const bundle = '/usr/local/lib/node_modules/pnpm/dist/pnpm.cjs';
function bundledIPv6() {
  const source = fs.readFileSync(bundle, 'utf8');
  const marker = '// lib/pnpm.js';
  assert.equal(source.split(marker).length, 2);
  const testModule = new Module(bundle, module);
  testModule.filename = bundle;
  testModule.paths = Module._nodeModulePaths(require('node:path').dirname(bundle));
  // Load the actual bundled module definitions; exclude pnpm's CLI entry point.
  testModule._compile(source.slice(0, source.indexOf(marker)) + '\nmodule.exports = require_ipv6();', bundle);
  return testModule.exports;
}
const paths = [
  '/usr/local/lib/node_modules/npm/node_modules/ip-address',
  '/usr/local/lib/node_modules/pnpm/dist/node_modules/ip-address',
];
(async () => {
  for (const path of paths) {
    assert.equal(require(path + '/package.json').version, '10.7.4');
    const { Address4, Address6 } = require(path);
    assert.equal(new Address4('192.168.1.20/24').correctForm(), '192.168.1.20');
    assert(new Address4('192.168.1.20').isInSubnet(new Address4('192.168.1.0/24')));
    assert.equal(new Address6('2001:0db8::1').correctForm(), '2001:db8::1');
    assert.equal(new Address6('fe80::1%eth0').zone, '%eth0');
    assert(Address6.isValid('::ffff:192.0.2.1'));
    assert(!Address6.isValid('not-an-address'));
    // Run the advisory regression outside the main thread with a hard deadline.
    const worker = new Worker(`
      const { parentPort, workerData } = require('node:worker_threads');
      const { Address6 } = require(workerData);
      parentPort.postMessage(Address6.isValid('%'.repeat(1024 * 1024) + '\\n'));
    `, { eval: true, workerData: path });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        worker.terminate(); reject(new Error('IPv6 rejection exceeded 2 seconds'));
      }, 2000);
      worker.once('message', value => { clearTimeout(timer); assert.equal(value, false); resolve(); });
      worker.once('error', error => { clearTimeout(timer); reject(error); });
    });
  }
  const { Address6 } = bundledIPv6();
  assert.equal(new Address6('2001:0db8::1').correctForm(), '2001:db8::1');
  assert.equal(new Address6('fe80::1%eth0').zone, '%eth0');
  const started = performance.now();
  assert(!Address6.isValid('%'.repeat(1024 * 1024) + '\n'));
  assert(performance.now() - started < 2000, 'Actual pnpm embedded parser must reject promptly');
  console.log('npm/pnpm IPv4, IPv6, zone and advisory regression checks passed');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
