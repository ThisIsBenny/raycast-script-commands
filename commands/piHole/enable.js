#!/usr/bin/env node

// @raycast.schemaVersion 1
// @raycast.title Enable PiHole
// @raycast.mode silent
// @raycast.icon images/piHoleLogo.png
// @raycast.description Enable PiHole
// @raycast.author Benny Hierl
// @raycast.authorURL https://github.com/ThisIsBenny/raycast-script-commands

const config = require('./config');
const { sendRequest, defaultError, capitalizeFirstLetter } = require('./helper');

sendRequest(`/admin/api.php?enable&auth=${config.token}`).then((data) => {
  console.log(capitalizeFirstLetter(data.status))
}).catch(defaultError)