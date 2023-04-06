#!/usr/bin/env sh

# This will be run in the middle of the routine workflow as defined by shiny-workflows/routine.yml
# https://github.com/rstudio/shiny-workflows/blob/7a52e1a443432ef88bef298c0a3c0ce182921dfb/.github/workflows/routine.yaml#L163-L166

echo "Running type-check..."
yarn type-check

echo "Building assets..."
yarn prod

git add inst/*/build/  || echo "no build to add"
git add inst/*/media/build/  || echo "no extension client-assets to add"
git add *.vsix || echo "no vsix to add"

git commit -m '`yarn prod` (GitHub Actions)' || echo "no changes to commit"
