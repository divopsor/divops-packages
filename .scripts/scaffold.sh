#! /bin/bash

cmd=""
path=""

read -p "Enter package name 👉 " name

if [[ -z $name ]]; then
  exit 1
fi


npx hygen package new --name $name

yarn
