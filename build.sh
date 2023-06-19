# install dependencies
npm install --prefix frontend
npm install --prefix backend

# Remove old builds
rm -rf frontend/dist
rm -rf frontend/.parcel-cache
rm -rf backend/dist

# Build
# - For frontend, we use parcel to build (react-typescript)
# - For backend, we use tsc to build (node-express-typescript)
npm run build --prefix frontend
npm run build --prefix backend

# Copy frontend build to backend
rm -rf backend/dist/public
mkdir backend/dist/public
cp -r frontend/dist/* backend/dist/public/