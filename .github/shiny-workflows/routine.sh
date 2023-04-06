#!/usr/bin/env sh

# This will be run in the middle of the routine workflow as defined by shiny-workflows/routine.yml
# https://github.com/rstudio/shiny-workflows/blob/7a52e1a443432ef88bef298c0a3c0ce182921dfb/.github/workflows/routine.yaml#L163-L166

# Install yarn deps
yarn install --immutable

# Run type-check
echo "Running type-check..."
yarn type-check

# Build assets
echo "Building assets..."
yarn prod

# Add any changes to repo
git add inst/*/build/  || echo "no build to add"
git add inst/*/media/build/  || echo "no extension client-assets to add"
git add *.vsix || echo "no vsix to add"

# commit changes
git commit -m '`yarn prod` (GitHub Actions)' || echo "no changes to commit"

# routine.yml will push the changes to the repo