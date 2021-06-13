import { getAllFiles } from './flies.js';
import { existsSync, mkdirSync, writeFileSync} from 'fs';
import { __dirname, require } from '../helpers/common.js';
import { join, sep, basename, resolve } from 'path';

const jsdocMd =  require('jsdoc-to-markdown');
const baseUrl = 'https://gitz.adform.com/AAP/AAP-IAP-Automated-Tests/blob/master/src/support/docs';
const modules = [];

export const generateDocs = (sourceDir, outputDir) => {

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }
    
    const scriptFiles = getAllFiles(sourceDir);
    
    for (const file of scriptFiles) {
        const fileSep = file.split(sep);
        const currentDir = fileSep[fileSep.length - 2];

        if (!existsSync(join(outputDir, currentDir))) {
            mkdirSync(join(outputDir, currentDir));
        }

        /* get template data */
        const templateData = jsdocMd.getTemplateDataSync({ files: file });

        /* reduce templateData to an array of class names */
        const moduleNames = templateData.reduce((moduleNames, identifier) => {
            if (identifier.kind === 'module') moduleNames.push(identifier.name);
            return moduleNames;
        }, []);

        const moduleDetails = {
            link: `${baseUrl}/${currentDir}/${basename(file, '.js')}.md`,
            moduleName: basename(file, '.js'),
        };

        modules.push(moduleDetails);

        /* create a documentation file for each class */
        for (const moduleName of moduleNames) {
            const template = `{{#module name="${moduleName}"}}{{>docs}}{{/module}}`;
            console.log(`rendering ${moduleName}, template: ${template}`);
            const output = jsdocMd.renderSync({ data: templateData, template });
            writeFileSync(resolve(outputDir, currentDir, `${moduleName}.md`), output);
        }
    }
};

export const generateIndex = (outputDir) => {
    let indexContent = '## Support API (Documentation for Utility methods)';

    for (const module of modules) {
        const moduleString = `\n\n * [${module.moduleName}](${module.link})`;
        console.log(`appending ${module.moduleName}`);
        indexContent += moduleString;
    }
    writeFileSync(resolve(outputDir, 'index.md'), indexContent);
};
