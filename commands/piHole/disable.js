#!/usr/bin/env node

// @raycast.schemaVersion 1
// @raycast.title Disable PiHole
// @raycast.mode silent
// @raycast.icon images/piHoleLogo.png
// @raycast.description Disable PiHole for X min
// @raycast.author Benny Hierl
// @raycast.authorURL https://github.com/ThisIsBenny/raycast-script-commands
// @raycast.argument1 { "type": "text", "placeholder": "Minutes", "optional": true}

const config = require('./config');
const { sendRequest, defaultError, capitalizeFirstLetter } = require('./helper');

const [minutes] = process.argv.slice(2)
let url = `/admin/api.php?disable&auth=${config.token}`;

if (minutes !== '') {
  const seconds = parseInt(minutes) * 60;
  url = `/admin/api.php?disable=${seconds}&auth=${config.token}`;
}

sendRequest(url).then((data) => {
  let postfix = ''
  if (minutes !== '') {
    postfix = ` for ${minutes} ` + ((parseInt(minutes) === 1) ? 'minute' : 'minutes');
  }
  console.log(`${capitalizeFirstLetter(data.status)}${postfix}`)
}).catch(defaultError)