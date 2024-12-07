#!/bin/bash

# postbuild.sh

rm -rfv debian/noted/usr/*

mkdir -p debian/noted/usr/lib/noted
mkdir -p debian/noted/usr/bin
mkdir -p debian/noted/usr/share

# binary
cp dist/index.js debian/noted/usr/bin/noted
chmod +x debian/noted/usr/bin/noted

cp -r dist/lib/* debian/noted/usr/lib/noted/

cp -r usr/share/* debian/noted/usr/share

cd debian && builddeb
