#!/bin/bash
. venv/bin/activate

for var in "$@"
do
    pip install $var
done

pip freeze > requirements.txt

.venv/bin/deactivate