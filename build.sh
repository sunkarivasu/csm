#!/bin/bash

# Check OS
uname=$(uname)  &&
if [[ $uname == "Linux" ]]; then
    echo -e "\x1b[93mOS: Linux\x1b[0m"
elif [[ $uname == "Darwin" ]]; then
    echo -e "\x1b[93mOS: MacOS\x1b[0m"
else
    echo -e "\x1b[0;91mUnsupported OS. Follow README to build manually\x1b[0m" &&
    exit 1
fi

# Check Node is installed
if ! command -v node &> /dev/null
then
    echo -e "\x1b[0;93mNode could not be found\x1b[0m" &&
    echo -e "\x1b[0;93mInstalling Node...\x1b[0m" 

    if [[ $uname == "Linux" ]]; then
        sudo apt update &&
        sudo apt install npm -y &&
        sudo npm i -g n &&
        sudo n 18.13 &&
        hash -r
    elif [[ $uname == "Darwin" ]]; then
        if ! command -v brew
        then
            echo -e "\x1b[0;93mPlease install nodejs and continue installation\x1b[0m" &&
            exit 1
        fi
        brew install node@18
    else
        echo -e "\x1b[0;91mUnsupported OS\x1b[0m" &&
        exit 1
    fi
fi
echo -e "\x1b[93mNode Version: $(node -v)\x1b[0m" &&

# check node version
node_version=$(node -v | cut -c 2-3) 
if [[ $node_version < 18 ]]; then
    echo -e "\x1b[0;91mNode version must be 18 or above\x1b[0m" &&
    exit 1
fi


# clean up
echo -e "\x1b[93mRemoving node_modules and old builds\x1b[0m" &&
bash build-rollback.sh &&

# Create data folder for logs
if [ ! -d "data/logs" ]; then
    mkdir -p data/logs
fi

if [ ! -f "data/logs/build.log" ]; then
    touch data/logs/build.log 
fi

if [ ! -d "data/logs/requests.log" ]; then
    touch data/logs/requests.log 
fi

if [ ! -d "data/logs/errors.log" ]; then
    touch data/logs/errors.log 
fi

if [ ! -d "data/logs/info.log" ]; then
    touch data/logs/info.log 
fi

# install dependencies
date >> data/build.log &&
echo -e "\x1b[93mInstalling frontend node_modules\x1b[0m" &&
npm install --prefix frontend >> data/build.log 2>&1
if [[ $? -ne 0 ]]; then
    echo -e "\x1b[0;91mFailed to install frontend node_modules, Check build.log for more info\x1b[0m" &&
    echo -e "\x1b[0;93mRolling back changes...\x1b[0m" &&
    bash build-rollback.sh &&
    exit 1
fi
echo -e "\x1b[33mInstalling backend node_modules\x1b[0m" &&
npm install --prefix backend >> data/build.log 2>&1
if [[ $? -ne 0 ]]; then
    echo -e "\x1b[0;91mFailed to install backend node_modules, Check build.log for more info\x1b[0m" &&
    echo -e "\x1b[0;93mRolling back changes...\x1b[0m" &&
    bash build-rollback.sh &&
    exit 1
fi

# Build
# - For frontend, we use parcel to build (react-typescript)
# - For backend, we use tsc to build (node-express-typescript)
echo -e "\x1b[0;93mBuilding Project...\x1b[0m" &&
npm run build --prefix frontend >> data/build.log &&
if [[ $? -ne 0 ]]; then
    echo -e "\x1b[0;91mFailed to build project, Check build.log for more info\x1b[0m" &&
    echo -e "\x1b[0;93mRolling back changes...\x1b[0m" &&
    bash build-rollback.sh &&
    exit 1
fi
npm run build --prefix backend >> data/build.log &&
if [[ $? -ne 0 ]]; then
    echo -e "\x1b[0;91mFailed to build project, Check build.log for more info\x1b[0m" &&
    echo -e "\x1b[0;93mRolling back changes...\x1b[0m" &&
    bash build-rollback.sh &&
    exit 1
fi

# Copy frontend build to backend
mkdir backend/dist/public &&
cp -r frontend/dist/* backend/dist/public/ &&
echo -e "\x1b[0;93mBuild Completed\x1b[0m"