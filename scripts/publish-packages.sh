# trailing slash to only match directories
for dir in ./packages/*/; do
  echo "Publishing $dir"
  yarn publish $dir
done
