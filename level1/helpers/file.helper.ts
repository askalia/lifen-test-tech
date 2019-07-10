import { Planning } from "../models";

const fs = require('fs');
const path = require('path');

export const readFileAsJson = (filePath: string): Planning => {
    if (! fs.existsSync(filePath)){
        throw new Error(`filePath ${filePath} does not exist`)
    }
    return JSON.parse(fs.readFileSync(filePath));
}

export const writeToFile = (filePath: string, data: any, callback: Function = undefined): void => {
    if (! fs.existsSync(path.dirname(filePath))) {
        throw new Error(`filePath ${path.dirname(filePath)} does not exist`)
    }
    
    if (typeof callback === 'function'){
        fs.writeFile(filePath, data, () => callback(filePath));
    }
    else {
        fs.writeFileSync(filePath, data);
    }
    
}