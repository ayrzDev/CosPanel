export { default as eslintConfig } from './eslint.config.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import tailwindPresetMod from './tailwind.preset.cjs';
export const tailwindPreset = tailwindPresetMod;
export * from './schema/env';
