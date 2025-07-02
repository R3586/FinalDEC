#!/usr/bin/env bash
cd frontend && npm install axios && npm run build
cd ../backend && pip install -r requirements.txt