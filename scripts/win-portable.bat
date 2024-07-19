@ECHO OFF

cd ..

if not exist node_modules\ (
    npm install
    echo Downloading dependencies
)

if not exist dist\ (
    npm run dev
    echo Running script
)

npm run build
echo build completed

PAUSE   