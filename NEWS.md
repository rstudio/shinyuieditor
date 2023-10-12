# 0.5.1

### Major changes

- Deleting an output with a bound render function in the server will now ask if you want to delete the render function as well. (#213)
- Updating the id of an input or output will now update the corresponding id in the server code. (#212)
- Removed support for multi-file apps. This was a major source of bugs and complexity and was not used by many people.
- New website based on Astro framework replaces the old one based on `pkgdown`. (#201)

### Minor changes

- Replaced `shiny::tabPanel` with `bslib::nav_panel()` to keep up with modern shiny app components. `tabPanel`s will be auto upgraded when using editor. (#215)

# shinyuieditor 0.5.0

### Major new features and improvements

- Switched underlying parsing to use TreeSitter instead of the built-in R parser. This simplifies codebase and also makes whole app faster.

### Minor new features and improvements

- CSS unit inputs now respect valid ranges for their corresponding units. E.g. can't go bigger than 100% or smaller than 0px. (26324946e132f38dd4183543c51e44392649fab7 and a3f385a75cb868b245a0762cd6fa04f5942177c3)
- You can now pass a direct path to an app in `launch_editor()`. (c931639284ed2420afe3ddc21fbb0261a289f8f4)

### Bug fixes

- No longer crashes when special characters (e.g. `\` or `"`) are put into string inputs (2e241278750b6af816e44bb51750646a6f5de393)
- Fixed bug where refreshing the page when using the editor via the `launch_editor()` function (as opposed to the vscode extension) could cause app file to be erased. (6aa03f4)
- Fixed visual bug where headers and footers of bslib cards would show up even when nothing was in them in the vscode extension. (7d253de)
- Fixed bug where non-bsicon versions of value boxes would be converted to `bsicons::bs_icon("undefined")`. (aefb778)

# shinyuieditor 0.4.3

### Major new features and improvements

- Value Boxes from `bslib` are now available to use

### Minor new features and improvements

- Ability to hook into pre/post processing of a node when going from raw ast to ui node and from ui node to R code. This enables the ability to abstract away things like function calls for arguments into things like enums or strings and then convert them back to function calls when generating R code.
- Updated underlying data structures to allow for more flexible navigation of the editors internal data structures. This will allow for more advanced features in the future where ui nodes can be added not only as children but as named arguments.

### Bug fixes

# shinyuieditor 0.4.2

### Major new features and improvements

### Minor new features and improvements

- Failures in reading/ parsing the app files are now caught and communicated to the user in the main UI in addition to the R console/ VSCode output pane. This means most crashes caused by malformed apps can be recovered from by fixing the formatting without needing to restart editor. Issue #56
- Failures in the front-end of the editor are now isolated to their location and include options for remedying along with submitting bug reports to github. #155

### Bug fixes

- Fixed problem introduced in 0.4.1 where elements dropped onto a grid layout would not be properly wrapped in a grid card if neccessary.
- Fixed bug where reactive values (or any user-declared functions) were called in code. #148
- Fixed problem where hard-resetting the app preview server didn't work when running in HTTPUV mode.

# shinyuieditor 0.4.1

### Major new features and improvements

- New more flexible `bslib::card()` based cards are now available along with the old grid cards being updated to reflect the new the `gridlayout` wrapper `gridlayout::grid_card()`.
- You can now add plain text anywhere you could add normal elements. The new "Static Text" node let's you enter descriptions etc... The contents can also have basic styles applied such as sizing and decoration.

### Minor new features and improvements

- Cards now have a simple header by default

### Bug fixes

- In vscode, if ui changes are made to the app the selection of output definitions and addition of new output definitions no longer breaks.
- Fixed problem where making lots of quick updates to the state would cause the app to crash due to backend and client getting out of sync.
- Content of cards can no longer spill over obscuring other elements like grid tract resizers.
- The visual indicator for swapping positions of items on the grid no longer flickers and actually is legible.
- The width argument of shiny text input elements is now reflected in the main editor view.
- plot outputs no longer have a fixed width of `200px` when their `width` argument is unset, instead filling width of container as they do in running app.
- Code/ functions that the editor doesn't know how to deal with (e.g. custom functions or non-implemented ui elements) no longer crash app to blank screen.

# shinyuieditor 0.4.0

### Major new features and improvements

- VSCode extension can now highlight output definitions and input uses in the server code.
- In embedded mode (on the main website) the ui editor now provides full code to reproduce the current app.

### Minor new features and improvements

### Bug fixes

# shinyuieditor 0.3.3

### Major new features and improvements

- There's now a VSCode extension for running the ui editor. It adds a button for jumping from an app script directly into the UI editor and opening app code alongside editor.

### Minor new features and improvements

- Elements can now be deleted and changes undone and redone using the keyboard (#131, #135)

### Bug fixes

- Fix bug where deleting the only item in a container then deleting that container could crash app (#a27d440)

# shinyuieditor 0.3.2

### Major new features and improvements

- When starting the ui editor on an empty app path a visual interface is provided for choosing between templates. These templates can be navigated into and back using undo/redo buttons to allow for "shopping around" for the best template. (#114, #115)

### Minor new features and improvements

- Switching from absolute to relative units in the grid tracts now results in the tract remaining (almost) the same size instead of jumping to a much bigger or much smaller size due to differences in magnitude of units. (#110)
- Improved quality/polish of included template apps.
- Radio inputs, sliders, DT tables, and ui outputs now default to a 100% width instead of an unset one.

### Bug fixes

- Dragging to resize a grid tract with focus still inside of a popup tract info widget now hides the widget so the drag-to-resize info popup is not obscured. (#110)
- Starting the editor on an app with a single column or row gridlayout element no longer crashes the app.
- On case-sensitive file-path operating systems like linux, the editor will now be able to see apps weather using the lowercase `.r` or uppercase `.R` extensions. (`ff46cdd`)
- Typing in numeric inputs no longer forces you to prefix numbers with 0 if you delete back to nothing to type a new number. (#118)
- Content in really small grid cards no longer overflows.

# shinyuieditor 0.3.1

### Minor new features and improvements

- Addition of ui node for adding `DT` tables to app with `DT::DTOutput()`.
- Addition of ui node for `plotly` plots with `plotly::plotlyOutput()`.

# shinyuieditor 0.3.0

### Major new features and improvements

- Arguments passed to a known ui function that are not known about are now shown and able to be deleted in the properties pane instead of silently being passed through.
- Arguments that are of incorrect or unknown types for a ui function are now displayed as such with the opportunity to revert to a valid value.

### Minor new features and improvements

- (Developer) Adding a new ui node now only requires meta-data and a component for the "App View" as the properties panel is automatically constructed
  - Overriding for custom properties panel layouts etc is possible using the `settingsFormRender` property for the ui node definition.

### Bug fixes

- Numeric inputs now have incrementer buttons in firefox (#60)

### Known bugs

# shinyuieditor 0.2.0

### Major new features and improvements

- New option for base page layout: `shiny::navbarPage()` (#76)
- Support for `shiny::tabsetPanel()`, `shiny::tabPanel()`, and `gridlayout::grid_container()`

### Minor new features and improvements

- Updated styles for drop-targets. Now use pulsing background color instead of outlines to indicate possible drop targets.
- Improved accessability for settings panel inputs with properly scoped labels and aria descriptions
- Popups on hover over the elements panel now provide some context for the functionality of the element. (#74)
- Update to React v18 for improved performance

### Bug fixes

- Fixes bug where ui editor would not work on hosted services like RStudio Workbench. Thanks @mdancho84! (#73, #90)
- Nodes can now be dragged to to the child position to the left of any of their ancestor nodes.
- Selection now properly follows node after move.
- Generated layout tables for gridlayout are now column aligned.

### Known bugs

# shinyuieditor 0.1.0

### Major new features and improvements

- Edits can now be made in either ui editor _or_ the in the code and the updates are now automatically synced (`fca63396948905055d6f42d05f87993bc3620c65`)
- New single-file starter templates (geyser and chick weights)
- The main container for placing items on grid is now `gridlayout::grid_card()`

### Minor new features and improvements

- Tract resizing is now much quicker and has less visual noise due to only showing small size-popups (`5e767eef9e62170f758d1aab87ba22464008cd7b`)
- Website updated with a bunch of new articles
- Added some explanatory text about the format of grid-names to the popup for naming newly added grid items (`ca625edb3c65c5a0da4ebebb5b9d04013c4e84e5`)
- The app preview window now no-longer shoes up at all if there's no preview connection. (`ae5d8113bd687bd7f7c2d540347bf3289bb57f49`)

### Bug fixes

- Theme argument is now supported in `gridlayout::grid_page()` (#51)
- Numeric inputs are now _usable_ in firefox (See "Known bugs" for more detail.)

### Known bugs

- Firefox inputs don't have increment buttons (#60)
- Arguments that a component knows about but are supplied a non-known argument type will simply get wiped away (#58)
- Can fail installing on windows using `pak` (#53)

# shinyuieditor 0.0.1.0

### Major new features and improvements

- Single-file apps are now supported (#41, #42)
- Rehauled the interface for updating the layout for `gridlayout::grid_page()`. Tracts can now be resized by dragging the divisions and the resizing controls hide when not in use to allow for more efficient use of space.
- Any code outside of the ui declaration is now preserved, along with `library()` calls (#38, #42)
- By default, namespaces are omitted from generated code in favor of placing `library()` calls at the top of the file (#42)

### Minor new features and improvements

- Refreshing the app preview now has animation to let the user know something actually happened (#34, #44)
- Arguments to functions that are not simple primative types are now preserved (#29, #37)
- If the browser window containing the editor is closed, the ui server now terminates, freeing the terminal (#27, #43)

### Bug fixes

- Leaving early from the editor no longer returns `NULL` to the console (#36, #45)
- Resizing grid panels to a smaller size now respects the grid tracts (#25, #46)
- Fixed accidental allowance of `gridlayout::grid_panel_plot()` being dropped into a `gridlayout::grid_panel_stack()` which could cause an invalid ui function state (#35, #49).

# shinyuieditor 0.0.0.9000

- Editor now works with Safari (#33)
