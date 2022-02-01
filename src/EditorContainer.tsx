import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import ElementsPalette from "components/Shiny-Ui-Elements/ElementsPalette";
import UiNode from "components/Shiny-Ui-Elements/UiNode";
import NodeUpdateContext from "components/Shiny-Ui-Elements/UiNode/NodeUpdateContext";
import {
  addNode,
  getNode,
  removeNode,
  updateNode,
} from "components/Shiny-Ui-Elements/UiNode/treeManipulation";
import { UiSettingsComponent } from "components/Shiny-Ui-Elements/UiNode/UiSettingsComponent";
import {
  NodePath,
  UiNodeProps,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import classes from "./EditorContainer.module.css";

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
      addNode: (path: NodePath, newNode: UiNodeProps) =>
        setTree((oldTree) => addNode({ tree: oldTree, path, newNode })),
      deleteNode: (path: NodePath) =>
        setTree((oldTree) => removeNode({ tree: oldTree, path })),
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

function SettingsPanel({
  tree,
  selectedPath,
}: {
  tree: UiNodeProps;
  selectedPath: NodePath | null;
}) {
  const nodeUpdaters = React.useContext(NodeUpdateContext);

  if (selectedPath === null) {
    return <div>Select an element to edit properties</div>;
  }
  const currentNode = getNode(tree, selectedPath);

  const { uiName, uiArguments } = currentNode;

  return (
    <div>
      <p>
        <strong>Element:</strong> {uiName}
      </p>
      <p>
        <strong>Path:</strong> [{selectedPath.join(",")}]
      </p>
      <hr style={{ padding: "1.5rem" }} />
      <UiSettingsComponent
        {...currentNode}
        onChange={(newSettings) => {
          console.log("New settings for a node!", {
            path: selectedPath,
            node: { uiName, uiArguments: newSettings },
          });
          nodeUpdaters.updateNode(selectedPath, {
            ...currentNode,
            uiArguments: newSettings,
          } as UiNodeProps);
        }}
        checkValid={false}
      />
    </div>
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
