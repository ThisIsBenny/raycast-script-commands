#!/usr/bin/env python3
import http.client, json

# @raycast.title First vaccinations in Germany
# @raycast.author Benny Hierl
# @raycast.authorURL https://github.com/ThisIsBenny
# @raycast.description Get vaccination qutoe from rki
# @raycast.schemaVersion 1
# @raycast.mode inline
# @raycast.icon 💉
# @raycast.refreshTime 1h

OUTPUT_INCLUDES_BAR = True
BAR_LENGTH = 25

conn = http.client.HTTPSConnection("rki-vaccination-data.vercel.app")
conn.request("GET", "/api")
res = conn.getresponse()
data = json.loads(res.read())
percentage = data['quote']


filled_element_count=round(BAR_LENGTH * percentage / 100)
blank_element_count=BAR_LENGTH - filled_element_count
bar = ""
bar = "▓" * filled_element_count
bar += "░" * blank_element_count

print("{} {}%".format(bar, percentage))