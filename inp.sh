#!/bin/bash

echo "------------------------------------"
echo "Searching for NodeJS services..."
echo "------------------------------------"

for dir in */; do 
    # look for package.json
    packageFile=(`find ./$dir -maxdepth 1 -name "package.json"`)

    # found a nodeJs project
    if [ ${#packageFile[0]} -gt 0 ]; then
        echo "Found a NodeJS project at $dir"
        
        sleep 1
        
        echo "Running npm install to install the dependencies"

        sleep 1

        cd $dir 

        # exec npm install
        npm install
            
        cd ..
        
        echo ""
    fi
done

exec bash