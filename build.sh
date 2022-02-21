set -e

rm -rf build
mkdir build

if [[ $1 != 'no-front' ]]; then
  npm run build-frontend
fi
cp -r frontend/build build/static

if [[ $1 != 'no-back' ]]; then
  npm run build-backend
fi
cp -r backend/build/backend/src/* build
[ -e node_modules ] && ln -sf node_modules build/node_modules
[ -e config.js ] && cp config.js build/config.js
cp backend/package.json build/package.json
