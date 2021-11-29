# trailing slash to only match directories
for dir in src/lib/*/; do
  echo "Publishing $dir"
  yarn publish $dir
done
