#!/bin/sh

echo "Installing node packages!"
echo "(1/3) Installing Backend Packages..."
(cd backend && npm install)
echo "(2/3) Installing Frontend Packages..."
(cd frontend && npm install)
echo "(3/3) Installing Root Packages..."
npm install concurrently && echo "SUCCESS: Installation Complete!" && exit 0
