#!/usr/bin/env node

// @raycast.schemaVersion 1
// @raycast.title Convert To Camel Case
// @raycast.mode silent
// @raycast.icon 🐫
// @raycast.description Convert clipboard content to Camel Case and paste it back to clipboard
// @raycast.author Benny Hierl
// @raycast.authorURL https://github.com/ThisIsBenny/raycast-script-commands

function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(data);
    proc.stdin.end();
}

function pbpaste() {
    var proc = require('child_process').spawnSync('pbpaste', { encoding : 'utf8' });
    return proc.stdout;
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return "";
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

const textFromClipboard = pbpaste()
const camelString = camelize(textFromClipboard)
pbcopy(camelString)
console.log("Pasted to clipboard")