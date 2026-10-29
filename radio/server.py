#!/usr/bin/env python3
"""Compatibility launcher for the integrated local radio server.

The Node server serves the frontend and its /api/tune endpoint on one port,
matching the Vercel deployment layout. No separate radio-backend port is used.
"""

import os
import subprocess
import sys
from pathlib import Path


root = Path(__file__).resolve().parent
port = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("PORT", "8080")
env = os.environ.copy()
env["PORT"] = str(port)

raise SystemExit(subprocess.call(["node", str(root / "local-server.js")], cwd=root, env=env))
