#!/bin/bash
# Log Claude Code tool calls to claude.log
# Truncates tool_input to avoid large file contents in the log
INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty' 2>/dev/null)
# Log only a short summary of the input (first 200 chars), not full file contents
TOOL_INPUT=$(echo "$INPUT" | jq -c '.tool_input // empty' 2>/dev/null | cut -c1-200)
TIMESTAMP=$(date -u '+%Y-%m-%dT%H:%M:%SZ')
# Write to log file only, no stdout output (stdout goes back to the API)
echo "$TIMESTAMP [$TOOL] $TOOL_INPUT" >> claude.log 2>/dev/null
exit 0
