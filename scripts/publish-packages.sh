#!/usr/bin/env bash

# trailing slash to only match directories
for dir in src/lib/*/; do
  pack_name=$(basename "$dir")
  echo "Processing $pack_name"
  npm publish --dry-run --quiet "$dir"
  # Careful with npm unpublish, --dry-run not available
  # npm unpublish --quiet "@svicons/$pack_name@v0.1.10"
done
