const testFolder = './rerun/';
const fs = require('fs');
const fileList = [];
var contents;
var counter;


fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
    const stats = fs.statSync(testFolder + file);
if (stats.size > 0) {
    fileList.push(testFolder + file);
};
});
console.log(fileList);
counter = fileList.length;
fileList.forEach(file => {
    counter = counter - 1;
contents = fs.readFileSync(file, 'utf8');
if (counter > 0) {
    contents = contents + '\n';
}
fs.appendFile("./@rerun.txt", contents, function(err) {
    if(err) {
        return console.log(err);
    }
});
});
})
