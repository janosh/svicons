#!/bin/bash

yarn add -D \
  @svg-icons/bootstrap \
  @svg-icons/boxicons-logos \
  @svg-icons/boxicons-regular \
  @svg-icons/boxicons-solid \
  @svg-icons/crypto \
  @svg-icons/entypo \
  @svg-icons/entypo-social \
  @svg-icons/evaicons-outline \
  @svg-icons/evaicons-solid \
  @svg-icons/evil \
  @svg-icons/fa-brands \
  @svg-icons/fa-regular \
  @svg-icons/fa-solid \
  @svg-icons/feather \
  @svg-icons/fluentui-system-filled \
  @svg-icons/fluentui-system-regular \
  @svg-icons/foundation \
  @svg-icons/heroicons-outline \
  @svg-icons/heroicons-solid \
  @svg-icons/icomoon \
  @svg-icons/ionicons-sharp \
  @svg-icons/ionicons-solid \
  @svg-icons/ionicons-outline \
  @svg-icons/material-outlined \
  @svg-icons/material-rounded \
  @svg-icons/material-twotone \
  @svg-icons/material-sharp \
  @svg-icons/octicons \
  @svg-icons/open-iconic \
  @svg-icons/remix-fill \
  @svg-icons/remix-editor \
  @svg-icons/remix-line \
  @svg-icons/simple-icons \
  @svg-icons/typicons \
  @svg-icons/zondicons


for dir in node_modules/@svg-icons/*; do
  name=${dir##*/}
  echo processing $name...
  mkdir -p "src/icons/$name"
  cp $dir/*.svg "src/icons/$name"
  rename -f 's/.svg/.svelte/' src/icons/$name/*
  sed -i '' 's/<svg \([a-z]\)/<svg {...$$props} \1/' src/icons/$name/*.svelte
done

node src/build.js
