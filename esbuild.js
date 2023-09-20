const { build } = require('esbuild');

build({
    entryPoints : ['src/index.js'],
    minify : true,
    keepNames : true,
    sourcemap : true,
    bundle: true,
    platform: 'node',
    outfile : './bundle/index.js',
}).catch(() => {
    process.exit(1);
})
