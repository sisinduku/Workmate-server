const fs = require('fs')

let text = fs.readFileSync('profile.txt', 'utf-8')
text = text.replace(/\r?\n|\r/g, '')
console.log(text);
