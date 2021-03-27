#!/bin/bash

yarn add -D \
  @svg-icons/fa-brands \
  @svg-icons/bootstrap \
  @svg-icons/material-sharp \
  @svg-icons/ionicons-solid \
  @svg-icons/material-filled \
  @svg-icons/octicons \
  @svg-icons/boxicons-regular \
  @svg-icons/boxicons-solid \
  @svg-icons/entypo \
  @svg-icons/heroicons-solid \
  @svg-icons/remix-fill \
  @svg-icons/ionicons-sharp \
  @svg-icons/material-twotone \
  @svg-icons/material-outlined \
  @svg-icons/material-rounded \
  @svg-icons/ionicons-outline \
  @svg-icons/foundation \
  @svg-icons/boxicons-logos \
  @svg-icons/entypo-social \
  @svg-icons/icomoon \

for dir in node_modules/@svg-icons/*; do
  name=${dir##*/}
  echo processing $name...
  mkdir -p "src/icons/$name"
  cp $dir/*.svg "src/icons/$name"
  rename 's/.svg/.svelte/' src/icons/$name/*
  sed -i '' 's/<svg \([a-z]\)/<svg {...$$props} \1/' src/icons/$name/*.svelte
done

node build.js