import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/**
 * eslint-config-next 16 ships native flat config, so these are spread
 * directly. Do not route them through FlatCompat — the eslintrc bridge
 * throws on this config's circular plugin references.
 */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'] },
  ...coreWebVitals,
  ...typescript,
]

export default eslintConfig
