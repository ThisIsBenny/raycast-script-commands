#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Muellmail
# @raycast.description Creates a Muellmail address, then adds it to the clipboard and opens the inbox of this address
# @raycast.mode compact
# Optional parameters:
# @raycast.icon 📨
# @raycast.author Benny Hierl
# @raycast.authorURL https://github.com/ThisIsBenny/raycast-script-commands

MAILADDRESS=$(curl -s "https://muellmail.com/newemail.php?emuser=%40muellmail.com")

echo "$MAILADDRESS" | pbcopy
open "https://muellmail.com/#/$MAILADDRESS"