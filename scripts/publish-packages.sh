#!/usr/bin/env bash

# trailing slash to only match directories
for dir in src/lib/*/; do
  echo "Publishing $dir"
  npm publish --dry-run --quiet "$dir"
done
