import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import ElementsPalette from "components/Shiny-Ui-Elements/ElementsPalette";
import UiNode from "components/Shiny-Ui-Elements/UiNode";
import NodeUpdateContext from "components/Shiny-Ui-Elements/UiNode/NodeUpdateContext";
import {
  addNode,
  removeNode,
  updateNode,
} from "components/Shiny-Ui-Elements/UiNode/treeManipulation";
import {
  NodePath,
  UiNodeProps,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import classes from "./EditorContainer.module.css";
import { SettingsPanel } from "./SettingsPanel";

export function EditorContainer() {
  // const { isLoading, error, data } = useQuery("initial-state", getInitialState);

  // if (isLoading) {
  //   return <h3>Loading initial state from server</h3>;
  // }

  // if (error || !data) {
  //   return <h3 style={{ color: "orangered" }}>Error with server request</h3>;
  // }

  const [selectedPath, setSelectedPath] = React.useState<NodePath | null>(null);
  const [tree, setTree] = React.useState(initialState);

  // Since these just use the setters they will never change over the lifecycle
  // of the component, so by wrapping in useMemo we can avoid unneccesary
  // rerenders caused by this object changing
  const editCallbacks = React.useMemo(
    () => ({
      updateNode: (path: NodePath, newNode: UiNodeProps) =>
        setTree((oldTree) => updateNode({ tree: oldTree, path, newNode })),
      addNode: (path: NodePath, newNode: UiNodeProps) => {
        setTree((oldTree) => addNode({ tree: oldTree, path, newNode }));
      },
      deleteNode: (path: NodePath) => {
        // Unselect node
        setSelectedPath(null);
        setTree((oldTree) => removeNode({ tree: oldTree, path }));
      },
      selectNode: (path: NodePath) => setSelectedPath(path),
    }),
    []
  );

  return (
    <NodeUpdateContext.Provider value={editCallbacks}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.leftSide}>
            <h1 className={classes.title}>Shiny Visual Editor</h1>
            <img src={rstudioLogo} alt="RStudio Logo" />
            <img
              src={shinyLogo}
              style={{ backgroundColor: "var(--rstudio-blue, pink)" }}
              alt="Shiny Logo"
            />
          </div>
        </div>
        <div className={`${classes.elementsPanel} ${classes.titledPanel}`}>
          <h3>Elements</h3>
          <ElementsPalette />
        </div>
        <div className={`${classes.propertiesPanel} ${classes.titledPanel}`}>
          <h3>Properties</h3>
          <SettingsPanel tree={tree} selectedPath={selectedPath} />
        </div>
        <div className={classes.editorHolder}>
          <UiNode {...tree} selectedPath={selectedPath} />
        </div>
      </div>
    </NodeUpdateContext.Provider>
  );
}

const initialState: UiNodeProps = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      ["header", "header"],
      ["sidebar", "plot"],
      ["sidebar", "plot"],
    ],
    rowSizes: ["100px", "1fr", "1fr"],
    colSizes: ["250px", "1fr"],
    gapSize: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        area: "header",
        title: "My App",
      },
    },
    {
      uiName: "gridlayout::grid_panel",
      uiArguments: {
        area: "sidebar",
        horizontalAlign: "spread",
        verticalAlign: "spread",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider1",
            label: "Slider 1",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider2",
            label: "Slider 2",
            min: 1,
            max: 10,
            value: 3,
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_panel",
      uiArguments: {
        area: "plot",
        horizontalAlign: "spread",
        verticalAlign: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot",
          },
        },
      ],
    },
  ],
};
