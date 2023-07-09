# City Super Market

Website to deliver groceries to your home.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [MongoDB](https://www.mongodb.com/)
-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/)
-   [nginx](https://www.nginx.com/)

### Installing

-   Clone the repository:

    ```bash
    git clone https://github.com/sunkarivasu/csm.git
    ```

-   Install dependencies:

    ```bash
    npm install --prefix frontend
    npm install --prefix backend
    ```

### Running

-   Start the application:

    ```bash
    npm start --prefix frontend
    npm start --prefix backend
    ```

## Deployment

```bash
npm run build
npm start
```

## Built With

-   [MongoDB](https://www.mongodb.com/)
-   [Express](https://expressjs.com/)
-   [React](https://reactjs.org/)
-   [Node.js](https://nodejs.org/en/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Mongoose](https://mongoosejs.com/)
-   [Passport](http://www.passportjs.org/)
-   [Parcel](https://parceljs.org/)
-   [Redux](https://redux.js.org/)
-   [React Router](https://reactrouter.com/)
-   [Docker](https://www.docker.com/)

## Authors

-   **[Vasu Sunkari](https://github.com/sunkarivasu)**
-   **[Dhamawreshwarakumar](https://github.com/Dhamareshwarakumar)**

# Developer Docs

## Project Setup

-   Create new project
    -   `mkdir csm && cd csm`
-   Create README.md
-   Initialize git
    -   `git init`
-   Specify .gitignore
    ```
    node_modules/
    dist/
    .env
    .parcel-cache/
    data/
    ```
-   Create Dockerfile

    ```
    FROM node:18.13.0
    WORKDIR /app
    COPY . /app/
    RUN npm run build
    EXPOSE 3333
    CMD [ "npm", "start" ]
    ```

-   Specify .dockerignore

    ```
    node_modules/
    dist/
    .parcel-cache/
    data/
    ```

## Frontend

-   mkdir `frontend` && cd `frontend`
-   initialize npm with `npm init`
-   install dependencies
    -   Dependencies
        -   `npm i react react-dom`
    -   Devdependencies
        -   `npm i -D parcel typescript @types/react @types/react-dom`
-   initialize typescript with `npx tsc --init`
-   update package.json

    ```json
    {
        "main": "index.html", // delete this line
        "source": "index.html",
        "scripts": {
            "start": "parcel",
            "build": "parcel build"
        }
    }
    ```

-   update tsconfig.json

    ```json
    {
        "compilerOptions": {
            "target": "es2016",
            "jsx": "react-jsx",
            "module": "commonjs",
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "noImplicitAny": true,
            "strictNullChecks": true,
            "skipLibCheck": true,
            "esModuleInterop": true
        }
    }
    ```

-   create index.html
-   create working structure

    ```
    - frontend
        | - src
        |   | - components
        |   | - config
        |   | - pages
        |   | - utils
        |   | - App.css
        |   | - App.tsx
        |   | - index.tsx
    ```

## Backend

-   mkdir `backend` && cd `backend`
-   initialize npm with `npm init`
-   install dependencies
    -   Dependencies
        -   `npm i express mongoose dotenv cors`
    -   Devdependencies
        -   `npm i -D nodemon typescript tslint @types/express @types/node @types/cors`
-   initialize typescript with `npx tsc --init`
-   update package.json

    ```json
    {
        "main": "dist/server.js",
        "scripts": {
            "prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
            "build": "tsc",
            "prestart": "npm run build",
            "start": "node .",
            "dev": "nodemon ."
        }
    }
    ```

-   update tsconfig.json

    ```json
    {
        "compilerOptions": {
            "target": "es2016",
            "module": "commonjs",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "noImplicitAny": true,
            "strictNullChecks": true,
            "skipLibCheck": true,
            "moduleResolution": "node",
            "sourceMap": true,
            "outDir": "./dist",
            "rootDir": "./src",
            "baseUrl": "./"
        },
        "include": ["src/**/*.ts"],
        "exclude": ["node_modules/**/*", "dist"]
    }
    ```

-   Set tslint.json

    ```json
    {
        "defaultSeverity": "error",
        "extends": ["tslint:recommended"],
        "jsRules": {},
        "rules": {
            "trailing-comma": [false],
            "no-console": [true, "warning"]
        },
        "rulesDirectory": []
    }
    ```

-   set nodemon.json

    ```json
    {
        "ignore": [".git", "node_modules", "dist"],
        "watch": ["."],
        "exec": "npm start",
        "ext": "ts"
    }
    ```

-   create server.ts
-   create backend structure

    ```
    - backend
        | - src
        |   | - config
        |   | - controllers
        |   | - interfaces
        |   | - models
        |   | - routes
        |   | - utils
        | - server.ts
    ```

## Deployment

-   Create an AWS EC2 instance
-   Add Inbound Security Rules
    -   HTTP
    -   HTTPS
    -   SSH
    -   Custom TCP Rule
        -   Port: 3333
        -   Source: Anywhere
    -   Custom TCP Rule
        -   Port: 3000
        -   Source: Anywhere
-   Assign elastic IP

### Github Actions

-   save `privatekey`, `hostname`, `username` in secrets
-   write github actions
