#!/usr/bin/env bash
# Create a Vite + React project that uses Biome (from the repo root) instead of ESLint/oxlint.
# Usage: ./new-react.sh <homework-number> <project-name>
#   e.g. ./new-react.sh 78 todoList   ->  js/78/todoList
set -euo pipefail

if [ $# -ne 2 ]; then
	echo "Usage: $0 <homework-number> <project-name>" >&2
	exit 1
fi

root="$(cd "$(dirname "$0")" && pwd)"
dir="$root/js/$1"
mkdir -p "$dir"
cd "$dir"

npm create vite@latest "$2" -- --template react --no-interactive
cd "$2"

rm -f eslint.config.js .oxlintrc.json
node -e '
const fs = require("fs");
const p = JSON.parse(fs.readFileSync("package.json"));
for (const d of ["eslint", "@eslint/js", "eslint-plugin-react-hooks", "eslint-plugin-react-refresh", "globals", "oxlint"])
	delete p.devDependencies[d];
p.scripts = {
	dev: "vite",
	build: "vite build",
	lint: "biome lint .",
	format: "biome format --write .",
	check: "biome check --write .",
	preview: "vite preview",
};
fs.writeFileSync("package.json", JSON.stringify(p, null, 2) + "\n");
'
npm install
npx biome check --write . || true

echo
echo "Done: $dir/$2"
echo "  cd js/$1/$2 && npm run dev"
