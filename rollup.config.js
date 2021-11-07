import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            file: pkg.main,
            format: 'es', // the preferred format
            sourcemap: 'inline',
        },
        {
            file: pkg.browser,
            format: 'umd',
            name: 'game', // the global which can be used in a browser
            sourcemap: 'inline',
            globals: { alge: 'alge' },
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        nodePolyfills({ crypto: true }),
        nodeResolve({ mainFields: ['main', 'browser'], preferBuiltins: true }),
        commonjs(),
        typescript({
            typescript: require('typescript'),
            rollupCommonJSResolveHack: true,
        }),
        terser(),
    ]
};