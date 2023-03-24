# Basic scaffold for adding a ui node to the ui editor

## Steps to converting to your node

- Copy the `UI_NODE_TEMPLATE/` folder and name it `PkgNodeName/` where `Pkg` is the name of the package containing the ui function (e.g. `Shiny` or `Gridlayout`), and `NodeName` is the name of the function you're implementing such as `PlotOutput` or `Grid_Card`. (Note that you should capitalize the first letter even if the main function isn't so it's clear the separation in namespace and function name)

- Fill in template with appropriate values
- Add the info object to the directory of ui nodes in the `uiNodeTypes.ts` file.
