#!/bin/bash
for var in "$@"
do
    pip install $var
done

pip freeze > requirements.txt