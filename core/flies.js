import  { join } from 'path';
import * as config from '../config/config.js';
import { require } from '../helpers/common.js';

const glob = require('glob');

export const getAllFiles = (sourceDir) => {
    
    const files = glob.sync(`${sourceDir}/**/*`, {
                  ignore: config.excludeList,
                });
    let arrayOfFiles = [];
    files.forEach((file) => {
        console.log(file);
        arrayOfFiles.push(join(file));            
    });        
    return arrayOfFiles;
};

