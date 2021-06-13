import { __dirname } from './helpers/common.js';
import { generateDocs, generateIndex } from './core/mdown.js';
import { join, parse } from 'path';

const outputDir = join(__dirname, 'docs');

generateDocs('',outputDir);
generateIndex(outputDir);
