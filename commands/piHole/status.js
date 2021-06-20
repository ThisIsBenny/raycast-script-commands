#!/usr/bin/env node

// @raycast.schemaVersion 1
// @raycast.title PiHole Status
// @raycast.mode inline
// @raycast.refreshTime 5m
// @raycast.icon images/piHoleLogo.png
// @raycast.description Show PiHole Stats of today
// @raycast.author Benny Hierl
// @raycast.authorURL https://github.com/ThisIsBenny/raycast-script-commands

const { sendRequest, defaultError } = require('./helper');

sendRequest('/admin/api.php?summaryRaw').then((data) => {
  const nf = new Intl.NumberFormat();
  const dns_queries_today = nf.format(data.dns_queries_today);
  const ads_blocked_today = nf.format(data.ads_blocked_today);
  const ads_percentage_today = nf.format(data.ads_percentage_today);

  console.log(`${data.status === 'enabled' ? '✅' : '😴'} || 📈 ${dns_queries_today} total queries || 🚫 ${ads_blocked_today} blocked queries => ${ads_percentage_today}%`);
}).catch(defaultError)