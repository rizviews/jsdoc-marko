import { createRequire } from 'module';

export const require = createRequire(import.meta.url);
export const __dirname = process.env.PWD;


