# Shiny Visual UI Editor

A GUI for laying out a Shiny application that generates clean and human-readable UI code.

## Quick Start

### Pre-reqs

- Two-file shiny app (or at least willingness to use the two file format)

### Installing

While in development the package is only available on github:

```r
install.packages("pak")
pak::pkg_install('rstudio/Shiny-Visual-Editor')
```

ℹ️ _You may need to setup your github PAT to access as the repo is still private. However, if you're reading this, you have access. To set this up run `usethis::create_github_token()` in the terminal._

### Running

Assuming theres an existing `ui.R` and `server.R` in the folder `existing-app/` relative to your current working directly (`getwd()`), then you start the ui-editor on that app by running the following code and pasting the returned link into your web-browser.

```r
ShinyUiEditor::launch_editor(app_loc = "existing-app/")
#> Live editor running at http://localhost:44509/app
```

---

# Roadmap

- [x] Recreate (most) features of the GridEd layout editor in Preact as proof of concept
  - [x] Make sure dogma is met with code
  - [x] Finish the EpicReactDev course
  - [x] Get to desired feature parity with GridEd
  - [x] Setup test suite
- [ ] MVP demo stage
  - [ ] Backend
    - [ ] Build a parser of simple Shiny UI code to some IR
    - [ ] Writer to go from IR -> Shiny UI code (first R then python).
  - [ ] Frontend
    - [ ] Add a staging area for un-placed items in the app
    - [ ] Add injestion of IR to visual editor
      - [x] Add a `ShinyElement` component that knows how to draw itself based on item metadata like UI function type etc.
    - [x] Ability to translate visual editor state to valid IR
- [ ] Hook up live apps to editor
- [ ] Decide feature bounds of application
- [ ] Mockup design of full visual editor (identifying feature phases)
- [ ] Implement design of feature phase 1
- [ ] Dogfood for a series of apps to work out major bugs/ poor ergonomics
- [ ] Implement phase 2 design
- [ ] Release

# Stack

- React
- Create React App for project setup
- Recoil for state management
- XState for complicated state transitions (e.g. item moving/resizing)

# Development Design Dogma

The following are a series of design practices that the code of this application strives to follow in the name of maintainable and efficient code. Don't hesitate to break these, just think strongly about _why_ when doing so.

## Overarching principle

> Complexity is anything related to the structure of a system that makes it hard to understand and modify that system

_- A Philosophy of Software Design, John Ousterhout_

## Name things to leave no doubt what they do

- Bad: `items`
- Good: `gridItemsState`

## Think a lot about the interface to a component/function

- The interface to a function (or a component's props) are much more important than the implementation they represent.
- Keep them simple without hiding dependencies
  - It's better to have explicit interface dependencies than hidden ones like React Context etc..

## Limit "dependencies" on other functions/ app structure as much as possible

- By keeping a function isolated you make it much less likely to need to be changed when something else in the app changes (e.g. a feature is added).
- E.g. Components can be passed references to a state store so it's explicit that they rely on the state rather than the implicit dependency on the state structure imposed by importing that variable within the functions script.

## Keep interfaces shallow

- A series of clearly labeled property is easier to parse than containers.
- Container objects tend to leak design desisions -- e.g. "dependencies.
- Non-primitive properties are much harder to cache for React.

## Minimize helper components

- If a component is only ever used within another, then it either should _not_ be a component or should be defined locally within the script of the utilizing component.
- Because of how React works, sometimes it's better for performance to use an externally designed function etc. to keep referential equality for caching etc..

## Only refactor subtasks to functions if implementation details harm comprehension of main task

- Keeping subtasks for a function within the flow of the function means there's less cognative jumping when trying to understand that function
- Sometimes, however, these subtasks are verbose and not important to the main task of the function: these can be refactored to (well named) functions
  - E.g. The act of finding out if a current drag box overlaps a grid cell is just a series of annoyingly verbose conditionals that sit within a loop. Refactoring to a function `checkIfOverlapping(boxA,boxB)` is totally fine and does not hinder understanding of the overall goal of the parent function.
