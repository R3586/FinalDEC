#!/usr/bin/env bash
cd ..front && npm install axios && npm run build
cd ../back && pip install -r requirements.txt
