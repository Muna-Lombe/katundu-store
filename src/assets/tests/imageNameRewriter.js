const fs = require('fs')
const path = require('path')
let filesObj = []
let imageDataObj = []
fs.readdir(process.cwd() + '/src/assets/tests/jsonServer/images/', (err, files) =>  {for (let i of files.entries()) { i[0] = i[1].split('.')[0]; filesObj[i[0]] = i[1] }})
fs.readFile(process.cwd() + '/src/assets/tests/jsonServer/ProductImages.json', 'utf-8', (err, files) => imageDataObj = JSON.parse(files))
function rewriteFilename(filename, imagename) {
  const oldpath = process.cwd() + "/src/assets/tests/jsonServer/images/" + filename + ".jpg";
  const newpath = process.cwd() + "/src/assets/tests/jsonServer/images/" + imagename + ".jpg";
  fs.rename(oldpath, newpath, (err) => err ? console.log("has error:", err): console.log("complete!"));
}

imageDataObj.forEach(i => (filesObj[i.id.toString()]) ? rewriteFilename(i.id.toString(),i.image_name): console.log("no file matching ", i.id))
