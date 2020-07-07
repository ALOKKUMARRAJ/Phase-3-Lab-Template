import * as Ajv from 'ajv';
import * as figures from 'figures';
import * as chalk from 'chalk';

const ajv = new Ajv({allErrors: true});
const validate = ajv.compile(require('./labDescSchema.json'));
const valid = validate(require('../sample-lab-descriptor.json'));


if (!valid) {
    if (validate.errors) {
	console.log(validate.errors);
	reportJSONErrors(validate.errors);
    }
}


function reportJSONErrors(errors: Ajv.ErrorObject[]) : void {
    const heading: string =
	`Errors were detected in the Lab Descriptor
FIX:

`;
    
    console.log(chalk`\n${heading}\n`);
    errors.forEach(showJSONError);
}


function propertyValueError(e: Ajv.ErrorObject) : void {
    let delim: string =` ${figures.pointer} `;
    delim = chalk`{yellow ${delim}}`;
    
    let msg: string = chalk`   {yellow ${e.message}}`;
    
    const dataPath: string =
	e.dataPath.replace(/\./g, delim);
    
    console.log(`\n${dataPath}\n${msg}\n`);        
}


function additionalPropertyError(e: Ajv.ErrorObject) {    
    console.log(e.propertyName);
    console.log(`\nPlease remove the following field:\n`);
    const ap: Ajv.AdditionalPropertiesParams = e.params;
    console.log(`${ap.additionalProperty}`);
}


function showJSONError(e: Ajv.ErrorObject) : void {
    switch(e.keyword) {
	case 'additionalProperties':
	    additionalPropertyError(e);
	    break;
	default:
	    propertyValueError(e);
	    break
    }   
}