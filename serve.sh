#!/usr/bin/env bash
# Local preview server — run ./serve.sh then open http://localhost:8000
cd "$(dirname "$0")"
echo "Serving portfolio at http://localhost:8000  (Ctrl+C to stop)"
python3 -m http.server 8000
