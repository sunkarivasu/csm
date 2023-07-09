#!/bin/bash

# remove node_modules
rm -rf frontend/node_modules &&
rm -rf backend/node_modules &&

# Remove old builds
rm -rf frontend/dist &&
rm -rf frontend/.parcel-cache &&
rm -rf backend/dist