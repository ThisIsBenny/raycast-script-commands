#!/usr/bin/env node

// @raycast.schemaVersion 1
// @raycast.title Vaccinated at least once in 🇩🇪
// @raycast.mode inline
// @raycast.refreshTime 1h
// @raycast.icon 💉
// @raycast.description Get vaccination qutoe from rki
// @raycast.author Benny Hierl
// @raycast.authorURL https://github.com/ThisIsBenny/raycast-script-commands

const http = require('https');
const BAR_LENGTH = 25;

const printBar = (percentage) => {
  const filled_element_count = Math.round(BAR_LENGTH * percentage / 100);
  const blank_element_count=BAR_LENGTH - filled_element_count;
  let bar = "";
  bar = "▓".repeat(filled_element_count);
  bar = bar + ("░".repeat(blank_element_count));
  console.log(`${bar} ${percentage}%`)
};

const callback = (response) => {
  let str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    const responseBody = JSON.parse(str);
    const de = responseBody.data.find((item) => item.name === 'Deutschland');
    printBar(de.vaccinatedAtLeastOnce.quote)
  });
}

http.request({
  host: 'rki-vaccination-data.vercel.app',
  path: '/api/v2'
}, callback).end();
