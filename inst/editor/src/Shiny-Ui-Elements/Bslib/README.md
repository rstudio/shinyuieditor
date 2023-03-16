# Basic scaffold for adding a ui node to the ui editor

## Steps to converting to your node

- Copy the `UI_NODE_TEMPLATE/` folder and name it `BslibCard/` where `Pkg` is the name of the package containing the ui function (e.g. `Shiny` or `Gridlayout`), and `Card` is the name of the function you're implementing such as `PlotOutput` or `Grid_Card`. (Note that you should capitalize the first letter even if the main function isn't so it's clear the separation in namespace and function name)

- Use find and replace within the new `BslibCard/` directory to find and replace the following text with appropriate names. (Make sure Match-Case is turned on.)
  - "BslibCard"
  - "bslibCard"
  - "Card"
- Update ui node settings type (`CardSettings`) and default values (`bslibCardDefaultSettings`) in `index.tsx`
- Update info object (`bslibCardInfo`) with correct title, category, and description.
- Add the info object to the directory of ui nodes in the `uiNodeTypes.ts` file.
