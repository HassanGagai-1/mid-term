const args = process.argv
const data = require(`./${args[2]}`);

let name = args[2].split('.')[0]
name = name.substring(0, name.length - 1)
let Name = `${name[0].toUpperCase()}${name.slice(1)}`

const object = data[0];

console.log(`import mongoose from "mongoose";\nconst { model, models, Schema } = mongoose;\n`);
console.log(`const ${name}Schema = new Schema({`)

Object.entries(object).forEach(([key, value], index) => {
    console.log(`\t${key}: ${typeof value === 'number' ? 'Number':'String'}${index+1 !== Object.entries(object).length ? ',':''}`)
});

console.log(`});\n`)
console.log(`export const ${Name} = models.${Name} || model('${Name}', ${name}Schema);`)