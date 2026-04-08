#!/bin/bash
INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
if echo "$CMD" | grep -qE 'git\s+push.*--force|git\s+push.*-f|git\s+reset\s+--hard'; then
  echo 'Blocked: destructive git operation. Use the Git CLI directly if intended.' >&2
  exit 2
fi
exit 0
